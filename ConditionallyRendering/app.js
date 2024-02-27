const app=Vue.createApp({
    data(){
        return{
            enteredGoalValue:'',
            goals:[]
        };
    },
    methods:{
        addGoal(){
            if(this.enteredGoalValue.trim() != '')
            {
                this.goals.push(this.enteredGoalValue);
            }
        },
        removeGoal(idx){
            this.goals.splice(idx,1);
        }
    }
}).mount('#app')