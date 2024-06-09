import {
  Container as BaseContainer,
  type ContainerProps,
} from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import styles from './container.module.css'

const PADDING_PROP = {
  initial: '2',
  xs: '2',
  sm: '3',
  md: '4',
  lg: '5',
  xl: '6',
}

export function Container(props: PropsWithChildren<ContainerProps>) {
  return <BaseContainer px={PADDING_PROP} {...props} />
}

export function PageContainer({
  children,
  ...props
}: PropsWithChildren<ContainerProps>) {
  return (
    <Container asChild pb={PADDING_PROP} {...props}>
      <main className={styles.main}>{children}</main>
    </Container>
  )
}
