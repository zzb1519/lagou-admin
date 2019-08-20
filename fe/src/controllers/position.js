import positonView from '../views/position.art'

export default {
    render(req , res , next){
        res.render(positonView(req))
    }
}