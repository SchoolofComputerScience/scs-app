import Vue from "vue";

export default class TestHelper {
  /**
   * Helper that will mount a component and set it's properties.
   * Created to eliminate the redundancy for mounting components in tests.
   *
   * Example, replaces the code:
   * <code>
   *    const Constructor = Vue.extend(HelloWorld);
   *    const HelloWorldComponent = new Constructor({
   *        propsData: {data: dataObject}
   *    }).$mount();
   * </code>
   *
   * With:
   * <code>
   *   TestHelper.mountComponent(HelloWorld, {propsData: {data: dataObject}});
   * </code>
   *
   * @author Billy Conner
   * @param Component
   * @param componentProperties
   * @returns {Vue}
   */
    static mountComponent(Component, componentProperties={}) {
        const Constructor = Vue.extend(Component);
        const vm = new Constructor(componentProperties).$mount();
        return vm;
    }
}
