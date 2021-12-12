import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  useSubmit,
  useActionData
} from 'remix'
import { useLoaderData, useTransition } from 'remix'
import invariant from 'tiny-invariant'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'

import type { Error, FullPlaylist, PlaylistTrack } from '~/types'
import { getPlaylist } from '~/lib/request'
import spotifyApi from '~/lib/spotify.server'
import { authenticator } from '~/services/auth.server'
import Loading from '~/components/utils/Loading'
import Songs from '~/components/Songs'
import PlaylistHeader from '~/components/PlaylistHeader'
import { currentTrackIdState, isPlayingState } from '~/atoms/songs'

export const loader: LoaderFunction = async ({ request, params }) => {
  const { tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  invariant(params.id, 'expected params.id')

  const api = await spotifyApi(request, tokens)
  const playlist = await getPlaylist(api, params.id)

  return {
    playlist
  }
}

export const action: ActionFunction = async ({ request }) => {
  const { tokens } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  const body = await request.formData()
  const trackId = body.get('trackId')?.toString()
  const trackUri = body.get('trackUri')?.toString()

  if (!trackUri) {
    return {
      error: {
        status: 404,
        message: 'Could not play song: invalid track uri'
      }
    }
  }

  const api = await spotifyApi(request, tokens)

  try {
    await api.play({ uris: [trackUri] })
  } catch (error) {
    console.error(error)
    return {
      error: {
        status: _.get(error, 'body.error.status'),
        message: _.get(error, 'body.error.message')
      }
    }
  }

  return {
    trackId,
    isPlaying: true
  }
}

export const meta: MetaFunction = () => {
  return {
    title: 'Playlist - Remix'
  }
}

function Playlist() {
  const data = useLoaderData<{
    playlist?: FullPlaylist
  }>()
  const actionData =
    useActionData<{ trackId: string; isPlaying: boolean; error: Error }>()
  const transition = useTransition()
  const submit = useSubmit()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const loading =
    transition.state === 'loading' && transition.type !== 'actionReload'

  console.log({ currentTrackId, isPlaying })
  useEffect(() => {
    if (actionData) {
      const { trackId, isPlaying, error } = actionData
      if (error) {
        toast.error(error.message)
      } else {
        setCurrentTrackId(trackId)
        setIsPlaying(isPlaying)
      }
    }
  }, [actionData])

  return (
    <>
      <section>
        <PlaylistHeader
          title={data.playlist?.name}
          subtitle="PLAYLIST"
          imageUrl={data.playlist?.images[0]?.url}
        />
      </section>
      <section>
        {loading ? (
          <div className="flex justify-center mt-36">
            <Loading />
          </div>
        ) : (
          <Songs
            playlist={data.playlist}
            onClick={(track: PlaylistTrack) => {
              submit(
                {
                  trackId: track.track.id,
                  trackUri: track.track.uri
                },
                { method: 'post' }
              )
            }}
          />
        )}
      </section>
    </>
  )
}

export default Playlist
