import { atom, selector } from 'recoil'

export const _onlineCheck = atom<boolean>({
    key: 'online-check',
    default: false,
})

export interface OnlineConfig {
    api: string
    site: string
    title: string
    hasGuest: boolean
    canLogin: boolean
    canRegister: boolean
    group: {
        enabled: boolean
        canCreate: boolean
        canDelete: boolean
    }
}

export const defaultOnlineConfig: OnlineConfig = {
    api: 'https://api.fdba.cn',
    site: 'https://fdba.cn',
    title: 'FDBD官方',
    hasGuest: true,
    canLogin: true,
    canRegister: true,
    group: {
        enabled: true,
        canCreate: true,
        canDelete: true,
    },
}

export const _onlineConfig = atom<OnlineConfig>({
    key: 'online-config',
    default: defaultOnlineConfig,
})

export const _onlineTitle = selector<string>({
    key: 'online-title',
    get: ({ get }) => get(_onlineConfig).title,
})

export const _onlineGroupConfig = selector<OnlineConfig['group']>({
    key: 'online-group-config',
    get: ({ get }) => {
        return get(_onlineConfig).group
    },
    set: ({ set, get }, newValue) => {
        set(_onlineConfig, (state) => {
            return {
                ...state,
                group: newValue,
            } as OnlineConfig
        })
    },
})
