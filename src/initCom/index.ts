import type { App } from 'vue'
import { defineAsyncComponent } from "vue";
export const components = [
    'Rectangle',
    'RectangleNew',
    'BgcBox',
    'Card',
    'Text',
    'TextNew',
    'ImgBox',
    'SwiperBox',
    'Etable',
    'VideoBox',
    'VideoBoxNew',
    'Vechart',
    'Table',
    'LoopBox'
]
export function setupGlobalH5Com(app: App<Element>) {
    components.forEach(key => {
        app.component(key, defineAsyncComponent(() => import(`./${key}/index.vue`)))
    })
}
