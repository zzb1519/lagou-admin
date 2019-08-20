import SMERouter from 'sme-router'


const router = new SMERouter('router-view' , 'hash')  //默认哈希

import Home from '../controllers/home'
import Position from '../controllers/position'

router.use((req , res , next) => {
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`).parent().addClass('active').siblings().removeClass('active')
})

//?????地址栏哈希值以及redirect？
router.route('/' ,Home.render)
router.route('/position',Position.render)


router.redirect('/')

export default router