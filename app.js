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
      this.message = this.currentUserInput;
    },
  },
});

app.mount('#app');

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
