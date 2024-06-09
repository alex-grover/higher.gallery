import {
  Container as BaseContainer,
  type ContainerProps,
} from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import styles from './container.module.css'

export const CONTAINER_PADDING = {
  initial: '2',
  xs: '2',
  sm: '3',
  md: '4',
  lg: '5',
  xl: '6',
}

export function Container(props: PropsWithChildren<ContainerProps>) {
  return <BaseContainer px={CONTAINER_PADDING} {...props} />
}

export function PageContainer({
  children,
  ...props
}: PropsWithChildren<ContainerProps>) {
  return (
    <Container asChild pb={CONTAINER_PADDING} {...props}>
      <main className={styles.main}>{children}</main>
    </Container>
  )
}
