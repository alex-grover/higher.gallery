import {
  Container as BaseContainer,
  type ContainerProps,
} from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const PADDING_PROP = {
  initial: '2',
  xs: '2',
  sm: '3',
  md: '4',
  lg: '5',
  xl: '6',
}

export function Container(props: PropsWithChildren<ContainerProps>) {
  return <BaseContainer asChild px={PADDING_PROP} {...props} />
}

export function PageContainer({
  children,
  ...props
}: PropsWithChildren<ContainerProps>) {
  return (
    <Container pb={PADDING_PROP} {...props}>
      <main>{children}</main>
    </Container>
  )
}
