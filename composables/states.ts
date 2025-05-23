import {RedeboonProperties} from "~/utils/interfaces";
import {createGlobalState, useLocalStorage} from "@vueuse/core";


export const initialValue = () => {
    return {
        groups: [
            {name: "Offen", id: '1722d63a-e443-4a04-96f8-16b4b03349e3'},
        ],
        lists: [
            {name: "Other", id: '51dab8c9-b20f-4d09-8913-76fa731d172b'},
        ],
        people: [
        ],
        queueStartIndex: 0,
    };
}
export const useRedeboonState = createGlobalState(() => {
        try {
            return useLocalStorage<RedeboonProperties>('booners', initialValue(),
                {
                    mergeDefaults: true,
                }
            );
        } catch (e) {
            return ref(initialValue());
        }
    }
);
