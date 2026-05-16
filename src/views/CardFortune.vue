<template>
  <div class="card-fortune">
    <h1>今日打牌运势</h1>
    <div class="fortune-card">
      <div class="date">{{ todayDate }}</div>
      <div class="fortune-content">
        <div class="fortune-icon" :class="fortuneLevel">{{ fortuneIcon }}</div>
        <h2>{{ fortuneTitle }}</h2>
        <p class="fortune-text">{{ fortuneText }}</p>
        <div class="lucky-info">
          <div class="info-item">
            <span class="label">幸运时辰：</span>
            <span class="value">{{ luckyTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">幸运方位：</span>
            <span class="value">{{ luckyDirection }}</span>
          </div>
          <div class="info-item">
            <span class="label">适合牌局：</span>
            <span class="value">{{ suitableGame }}</span>
          </div>
        </div>
      </div>
    </div>
    <button @click="checkAgain" class="refresh-btn">重新测算</button>
  </div>
</template>

<script>
export default {
  name: 'CardFortune',
  data() {
    return {
      todayDate: '',
      fortuneLevel: '',
      fortuneIcon: '',
      fortuneTitle: '',
      fortuneText: '',
      luckyTime: '',
      luckyDirection: '',
      suitableGame: '',
      seed: 0
    }
  },
  mounted() {
    this.calculateFortune()
  },
  methods: {
    calculateFortune() {
      const now = new Date()
      this.todayDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
      
      // 使用日期作为随机种子，保证同一天结果相同
      const dateNum = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + this.seed
      const random = this.seededRandom(dateNum)
      
      const fortunes = [
        {
          level: 'excellent',
          icon: '🎉',
          title: '大吉大利',
          text: '今天运势极佳！牌局中必定顺风顺水，赢面很大。建议积极参与牌局，把握好机会。',
          times: ['上午9-11点', '下午2-4点', '晚上7-9点'],
          directions: ['东方', '南方', '东南方'],
          games: ['麻将', '斗地主', '德州扑克']
        },
        {
          level: 'good',
          icon: '😊',
          title: '运势不错',
          text: '今天运气还不错，打牌会有小收获。保持平常心，稳扎稳打，会有不错的结果。',
          times: ['上午10-12点', '下午3-5点', '晚上8-10点'],
          directions: ['西方', '北方', '西北方'],
          games: ['麻将', '扑克', '升级']
        },
        {
          level: 'normal',
          icon: '😐',
          title: '运势平平',
          text: '今天运势一般，打牌要谨慎。建议小赌怡情，量力而行，切勿贪心。',
          times: ['中午12-2点', '下午4-6点', '晚上9-11点'],
          directions: ['东北方', '西南方', '正南方'],
          games: ['简单的扑克牌', '休闲类棋牌', '娱乐麻将']
        },
        {
          level: 'bad',
          icon: '😔',
          title: '不太适合',
          text: '今天运势欠佳，不太适合打牌。建议以观战为主，或者改日再战。如果一定要打，记得保持好心态。',
          times: ['早上8-10点', '下午1-3点', '晚上6-8点'],
          directions: ['正北方', '正西方', '东北方'],
          games: ['观战学习', '打发时间的简单游戏']
        }
      ]
      
      const index = Math.floor(random * fortunes.length)
      const fortune = fortunes[index]
      
      this.fortuneLevel = fortune.level
      this.fortuneIcon = fortune.icon
      this.fortuneTitle = fortune.title
      this.fortuneText = fortune.text
      this.luckyTime = fortune.times[Math.floor(random * 100) % fortune.times.length]
      this.luckyDirection = fortune.directions[Math.floor(random * 200) % fortune.directions.length]
      this.suitableGame = fortune.games[Math.floor(random * 300) % fortune.games.length]
    },
    seededRandom(seed) {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    },
    checkAgain() {
      this.seed++
      this.calculateFortune()
    }
  }
}
</script>

<style scoped lang="scss">
.card-fortune {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  
  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 32px;
  }
  
  .fortune-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    color: white;
    
    .date {
      font-size: 18px;
      margin-bottom: 20px;
      opacity: 0.9;
    }
    
    .fortune-content {
      .fortune-icon {
        font-size: 80px;
        margin: 20px 0;
        animation: bounce 2s infinite;
        
        &.excellent {
          animation: bounce 1s infinite;
        }
      }
      
      h2 {
        font-size: 36px;
        margin: 20px 0;
        font-weight: bold;
      }
      
      .fortune-text {
        font-size: 18px;
        line-height: 1.8;
        margin: 20px 0;
        opacity: 0.95;
      }
      
      .lucky-info {
        margin-top: 30px;
        text-align: left;
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        
        .info-item {
          margin: 10px 0;
          font-size: 16px;
          
          .label {
            font-weight: bold;
            margin-right: 10px;
          }
          
          .value {
            color: #ffd700;
          }
        }
      }
    }
  }
  
  .refresh-btn {
    margin-top: 30px;
    padding: 12px 40px;
    font-size: 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
    
    &:hover {
      background: #35a372;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(66, 185, 131, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
