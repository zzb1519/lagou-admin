import SMERouter from 'sme-router'


const router = new SMERouter('router-view' , 'hash')  //默认哈希

import Home from '../controllers/home'
import Position from '../controllers/position'

router.use((req , res , next) => {
    console.log(req.url);
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`).parent().addClass('active').siblings().removeClass('active')
})

//?????地址栏哈希值以及redirect？
router.route('/position',Position.render)
router.route('/home' ,Home.render)  
router.route('/position_add', Position.add)
router.route('/position_edit',Position.edit)

router.redirect('/position')

export default router