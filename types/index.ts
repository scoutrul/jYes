export interface TagIdsInterface {
  [index: number]: string
}
export interface TagInterface {
  title: string
  id: string
  selected?: boolean
}
export interface TagsInterface {
  [index: number]: TagInterface
}

export interface PostInterface {
  id: string
  title: string
  tags?: TagIdsInterface
  body: string
}
export interface PostsInterface {
  [index: number]: PostInterface
}
