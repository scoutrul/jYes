export interface ITagIds {
  [index: number]: string
}
export interface ITag {
  title: string
  id: string
  selected?: boolean
}
export interface ITags {
  [index: number]: ITag
}

export interface IPost {
  id: string
  title: string
  tags?: ITagIds
  content: IContents
}
export interface IPosts {
  [index: number]: IPost
}

export interface IContent {
  id: number,
  body: string,
  isCode: boolean
}

export interface IContents {
  [index: number]: IPost
}
