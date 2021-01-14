const app = new Vue({
  el: '#app',
  data: {
    books: [{name:'《算法导论》',publishDate:'2006-9',price:'85',num:'1'},
    {name:'《unix编程艺术》',publishDate:'2006-2',price:'59',num:'1'},
    {name:'《编程珠玑》',publishDate:'2008-10',price:'39',num:'1'},
    {name:'《代码大全》',publishDate:'2006-3',price:'128',num:'1'}]
  },
  methods: {
    subNum(index){
      if(this.books[index].num === 1){
        this.removeBook(index);
      }
      else{
        this.books[index].num--;
      }
    },
    addNum(index){
      this.books[index].num++;
    },
    removeBook(index){
      this.books.splice(index,1);
    }
  },
  computed: {
    totalCost(){
      // let result = 0;
      // for (let index = 0; index < this.books.length; index++) {
      //   const tmpCost = this.books[index].price * this.books[index].num;
      //   result += tmpCost;
      // }
      return this.books.reduce(((preValue, book)=> preValue + book.price * book.num),0);
    }
  },
  filters: {
    showPrice(price){
      return '¥'+price;
    }
  }
});