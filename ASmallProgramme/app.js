function RandomHealth(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data()
    {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            winner: null,
            battleLogs:[],
            currentRound:0,
            specialAttackRound:0,
        };
    },
    watch: {
        playerHealth(value)
        {
            if (value <= 0 && this.monsterHealth <= 0)
            {
                this.winner = 'draw';
            } else if (value <= 0)
            {
                this.winner = 'monster';
            }
        },
        monsterHealth(value)
        {
            if (value <= 0 && this.playerHealth <= 0)
            {
                this.winner = 'draw'
            } else if (value <= 0)
            {
                this.winner = 'player'
            }
        },
    },
    computed: {
        playerHealthBar()
        {
            return {
                width: this.playerHealth + '%'
            };
        },
        monsterHealthBar()
        {
            return {
                width: this.monsterHealth + '%'
            };
        },
        mayUseSpecialAttack(){
           if(this.currentRound - this.specialAttackRound > 3){
            return false;
           }else{
            return true;
           }
        }
    },
    methods: {
        attackMonster()
        {
            this.currentRound++;
            const damageValue = RandomHealth(5, 12);
            this.monsterHealth -= damageValue;
            this.attackPlayer();
            this.addBattleLog('player','attack',damageValue)
        },
        attackPlayer()
        {
            const damageValue = RandomHealth(8, 15);
            this.playerHealth -= damageValue;
            this.addBattleLog('monster','attack',damageValue)

        },
        specialAttack()
        {
            this.currentRound++;
            this.specialAttackRound=this.currentRound;
            const damageValue = RandomHealth(10, 20);
            this.monsterHealth -= damageValue;
            this.attackPlayer();
            this.addBattleLog('player','attack',damageValue)
        },
        healPlayer()
        {
            this.currentRound++;
            const healValue = RandomHealth(10, 20);
            if (this.playerHealth + healValue > 100)
            {
                this.playerHealth = 100;
            } else
            {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addBattleLog('player','heal',healValue);
        },
        surround()
        {
            this.winner = 'monster';
        },
        restartGame()
        {
            this.currentRound=0;
            this.specialAttackRound=0;
            this.winner = null;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        addBattleLog(who,what,value)
        {
            this.battleLogs.unshift({
                actionBy : who,
                actionName : what,
                actionValue : value,
            });
        }
    }
});
app.mount("#app");
