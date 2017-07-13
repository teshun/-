import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Admin from '@/components/Admin/Admin'
import Cardetail from '@/components/Cardetail/Cardetail'
import CarText from '@/components/CarText/CarText'
import Carphoto from '@/components/carphoto/carphoto'
import Personal from '@/components/personal/Personal'
import Comment from '@/components/comment/Comment'
import Commentmanage from '@/components/commentmanage/commentmanage'
import Commentlist from '@/components/commentlist/commentlist'
import NewsAdd from '@/components/NewsAdd/newsadd'
import Shownews from '@/components/shownews/Shownews'
import Delnews from '@/components/Delnews/Delnews'
import Searchlist from '@/components/searchlist/searchlist'
import Hotmanage from '@/components/hotmanage/hotmanage'
import Delhot from '@/components/delhot/delhot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
    	path:'/index',
    	name:"index",
    	component:Index
    },
    {
    	path:'/admin',
    	name:"admin",
    	component:Admin,
    	redirect:'/admin/cartext',
    	children:[
    		{path:"cartext",name:'cartext',component:CarText},
    		{path:"carphoto/:carname",name:'carphoto',component:Carphoto},
    		{path:'commentmanage',name:'commentmanage',component:Commentmanage},
    		{path:'commentlist/:car',name:'commentlist',component:Commentlist},
    		{path:'newsadd',name:'newsadd',component:NewsAdd},
    		{path:'delnews',name:'delnews',component:Delnews},
            {path:'hotmanage',name:'hotmanage',component:Hotmanage},
            {path:'delhot',name:'delhot',component:Delhot}
    	]
    },
    {
    	path:'/cardetail/:id',
    	name:'cardetail',
    	component:Cardetail
    },
    {
    	path:'/personal',
    	name:'personal',
    	component:Personal
    },
    {
    	path:'/comment',
    	name:'comment',
    	component:Comment
    },
    {
    	path:'/shownews/:id',
    	name:'shownews',
    	component:Shownews
    },
    {
    	path:'/searchlist/:carname',
    	name:'searchlist',
    	component:Searchlist
    }
  ]
})
