const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;

      // below is just another way of grabbing the value of an input by using refs
      this.message = this.$refs.userText.value;
      console.dir(this.$refs.userText);
    }
  },
  beforeCreate() {
    console.log('beforeCreate()');
    // here you could also send an http request to a server, add a timer, etc
  },
  created() {
    console.log('created()');
  },
  beforeMount() {
    console.log('beforeMount()');
  },
  mounted() {
    // Here is where you actually see something on the screen from Vue. YOu can set breakpoints in the source tab to see
    console.log('mounted()');
  },
  beforeUpdate() {
    console.log('beforeUpdate()');
  },
  updated() {
    // changes are now seen at this breakpoint after an update has occured
    console.log('updated()');
  },
  beforeUnmount() {
    console.log('beforeUnmount()');
  },
  unmounted() {
    console.log('unmounted()');
  }
});

app.mount('#app');
setTimeout(function() {
  app.unmount()
}, 3000);

// A little understanding of how Vue works and uses "Proxies" for a data object to update those properties when
// certain keys are updated in that data object

// data object to alter
const data = {
  message: 'Hello',
  longMessage: 'Hello World!'
};

// handler with logic to use to pass into the proxy to update anything you want inside the data object
const handler = {
  set(target, key, value) {
    console.log(target);
    console.log(key);
    console.log(value);
    if (key === 'message') {
      target.longMessage = value + 'World!'
    }
    target.message = value;
  }
};

// create the proxy
const proxy = new Proxy(data, handler);

// when we update the message key, the handler logic will run thus when logging out long message below
// it now becomes "Hello!!!!!! World!" instead of what we originally set it as => "Hello World!"
proxy.message = 'Hello!!!!!!';

console.log(proxy.longMessage)
