import { HttpContext } from '@adonisjs/core/http'

export default class FolderController {

    async show({ inertia }: HttpContext) {
        return inertia.render('folders/show_folders', {  })
    }
}