/*
 * @Author: ShawDe
 * @Date: 2024-02-25 19:24:09
 * @Description: 
 */
const app = Vue.createApp({
    data()
    {
        return {
            courseGoal: 'Learn Vue!',
            courseGoalB: '<h2>My Course Goal</h2>',
            vueLink: 'https://vuejs.org',
        };
    },
    methods: {
        OurGoal()
        {
            const randomNumber = Math.random();
            if (randomNumber < 0.5)
            {
                return this.courseGoal;
            } else
            {
                return 'Master vue';
            }
        }
    }
});

app.mount("#app");