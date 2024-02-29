const app=Vue.createApp({
    beforeCreate(){
        console.log('beforeCreate()');
    },
    created(){
        console.log('created(');
    },
    beforeMount(){
        console.log('beforeMount()');
    },
    mounted(){
        console.log('mounted');
    },
    beforeUpdate(){
        console.log('beforeUpdate()');
    },
    updated(){
        console.log('updated()');
    },
    beforeUnmount(){
        console.log('beforeUnmount()');
    },
    unmounted(){
        console.log('unmount()');
    },
});

app.mount('#app');

setTimeout(function(){
    app.unmount();
},3000);