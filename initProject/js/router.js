import * as main from '../component/main';
import * as classify from '../component/classify';
import * as article from '../component/article';
const myRouter=(vue)=>{
    return {
        routes:[
            {
                path:'/classify',
                component:classify
            },
            {
                path:'/article',
                component:article
            },
            {
                path:'*',
                component:main
            },
            {
                path:'/main',
                component:main
            }
        ]
    }
}

export default myRouter;