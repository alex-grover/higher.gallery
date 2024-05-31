export type NextRouteContext = {
  params: Record<string, string | string[]>
}

export type NextPageContext = NextRouteContext & {
  searchParams: Record<string, string | string[] | undefined>
}
