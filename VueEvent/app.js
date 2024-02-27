/*
 * @Author: ShawDe
 * @Date: 2024-02-26 09:57:29
 * @Description: 
 */
const app=Vue.createApp(
    {
        data(){
            return{
                counter:0,
                name:'',
                confirmedName:'',
            };
        },
        methods:{
            add(num){
                this.counter+=num;
            },
            reduce(num){
                const temp=this.counter-num;
                if(temp<0)
                {
                    alert("Too small");
                }else{
                    this.counter-=num;
                }
            },
            setName(event,lastname){
                this.name = event.target.value+' '+lastname;
            },
            confirmedInput(){
                if(this.name.trim() =='shaw')this.name=''
                this.confirmedName=this.name;
            },
            resetInput(){
                this.name='';
            },
            // submitForm(event){
            //     event.preventDefault();
            //     alert('submitted');
            // },
            submitForm(){
                // event.preventDefault();
                alert('submitted');
            }
        }
    }
);

app.mount('#app')

