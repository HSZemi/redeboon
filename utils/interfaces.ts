export interface Person {
    id: string
    name: string
    group: string
    list: string
    count: number
    queuedAt: number | null
}

export interface QueuedPerson {
    position: number
    person: Person
}

export interface GroupedPeople {
    [key: string]: Person[]
}

export interface Group {
    id: string
    name: string
}

export interface List {
    id: string
    name: string
}

export interface RedeboonProperties {
    groups: Group[],
    lists: List[],
    people: Person[],
    queueStartIndex: number,
}
