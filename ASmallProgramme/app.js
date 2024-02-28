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
        }
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
        }
    },
    methods: {
        attackMonster()
        {
            const damageValue = RandomHealth(5, 12);
            this.monsterHealth -= damageValue;
            this.attackPlayer();
        },
        attackPlayer()
        {
            const damageValue = RandomHealth(8, 15);
            this.playerHealth -= damageValue;
        },
        specialAttack()
        {
            const damageValue = RandomHealth(10, 20);
            this.monsterHealth -= damageValue;
            this.attackPlayer();
        },
        healPlayer()
        {
            const healValue = RandomHealth(10, 20);
            if (this.playerHealth + healValue > 100)
            {
                this.playerHealth = 100;
            } else
            {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        surround()
        {
            this.winner = 'monster';
        },
        restartGame()
        {
            this.winner = null;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        }
    }
});
app.mount("#app");
