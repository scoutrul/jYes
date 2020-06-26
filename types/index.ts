export interface TagInterface {
  id: string
  title: string
  selected?: boolean
}
export interface TagsInterface {
  [index: number]: TagInterface
}

export interface TagIdsInterface {
  [index: number]: string
}

export interface PostInterface {
  id: string
  title: string
  tags?: TagIdsInterface,
  body: string
}
export interface PostsInterface {
  [index: number]: PostInterface
}
