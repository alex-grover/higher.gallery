import { FormEvent, useCallback, useRef } from 'react'

export function CollectionDialog() {
  const ref = useRef<HTMLDialogElement | null>(null)

  const handleOpen = useCallback(() => {
    if (!ref.current) return
    ref.current.showModal()
  }, [])

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // TODO: implement
    // Upload metadata to IPFS
    // Submit create collection tx
    // Revalidate user collections
    // Push to token form
  }, [])

  return (
    <>
      <button onClick={handleOpen}>Create new</button>
      <dialog ref={ref}>
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" />
          <input name="name" placeholder="Name" autoFocus />
          <textarea name="description" placeholder="Description" />
          <button>Create</button>
        </form>
      </dialog>
    </>
  )
}
