import React, { useCallback, useEffect, useMemo } from 'react'
import { Transition } from 'react-transition-group'
import Portal from './portal'
import { atom, useRecoilState } from 'recoil'
import { nanoid } from 'nanoid'

export type State = 'entering' | 'entered' | 'exiting' | 'exited'

export interface InnerState {
  state: State
  handleClose(): void
}

interface OverlaysState {
  [key: string]: boolean
}

export const overlaysState = atom<OverlaysState>({
  key: 'overlays',
  default: {} as OverlaysState,
})

interface Props {
  render({ state, handleClose }: InnerState): JSX.Element
}

type ControlledProps = Props & { opened: boolean; handleClose: () => void }

export function ControlledPopup({ render, opened, handleClose }: ControlledProps) {
  return (
    <Portal>
      <React.Fragment>
        <div
          onClick={handleClose}
          css={`
            display: ${opened ? 'initial' : 'none'};
            backgroundcolor: gray;
            opacity: 0.3;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        />
        <Transition in={Boolean(opened)} timeout={50}>
          {(state: State) => (
            <div
            // sx={{
            //   display: state === 'entered' ? 'initial' : 'none',
            //   left: '50%',
            //   transform: 'translateX(-50%)',
            //   backgroundColor: 'white',
            //   position: 'fixed',
            //   top: 80,
            //   zIndex: '100',
            //   width: 750,
            //   height: '68vh',
            // }}
            >
              {render({ state, handleClose })}
            </div>
          )}
        </Transition>
      </React.Fragment>
    </Portal>
  )
}

function Popup({ render }: Props) {
  const id = useMemo(() => nanoid(), [])
  const [overlays, setOverlays] = useRecoilState(overlaysState)
  const opened = useMemo(() => overlays[id], [overlays, id])
  useEffect(() => {
    setOverlays((state) => ({ ...state, [id]: false }))
  }, [id, setOverlays])
  const handleClose = useCallback(() => {
    setOverlays((state) => ({ ...state, [id]: false }))
  }, [id, setOverlays])

  return <ControlledPopup opened={opened} handleClose={handleClose} render={render} />
}

export default Popup
