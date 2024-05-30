import styles from './page.module.css'

export const revalidate = 86400 // One day in seconds

export default function TokenPage() {
  // TODO: fetch token data from Ponder

  return (
    <main className={styles.container}>
      <div className={styles.image}>TODO: image</div>
      <div className={styles.details}>
        <div className={styles.metadata}>
          <div className={styles.name}>TODO: name</div>
          <div className={styles.artist}>TODO: artist</div>
          <div className={styles.collection}>TODO: collection</div>
        </div>
        <button className={styles.button}>Mint for TODO: price</button>
        <div>TODO: time remaining, mint count, supply limit</div>
        <div>TODO: comment feed</div>
      </div>
    </main>
  )
}
