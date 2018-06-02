import Vue from "vue";
import EditPage from "../../src/components/EditPage.vue";

describe('test EditPage.vue', () => {

    console.log("yes")
    let vm = new Vue(EditPage)

    it('var showBox should init to be false', () => {
        expect(vm.showBox).toBe(false)
    })

    it('test ')
})