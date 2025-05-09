import { test } from '@japa/runner'
import sinon from 'sinon';
import sinonTest from 'sinon-test';

import FolderService from '#services/folder_service'
import FolderRepository from '#repositories/folder_repository'

test.group('FolderService', (group) => {
    let service: FolderService
    let folderRepository: FolderRepository
    let stest = sinonTest(sinon, {})

    group.setup(async () => {
        folderRepository = new FolderRepository()
        service = new FolderService(folderRepository)
    })


    test("Test list folder by circle", 
        stest(function() {
        var mockService = this.mock(folderRepository);
        mockService.expects('listByCircleUuid').once().withArgs('12345').returns(Promise.resolve([{
            uuid: '12345',
            name: 'Test Folder',
            description: 'This is a test folder'}]))

            service.listFoldersByCircle('12345');

            mockService.verify()

        //assert.isTrue(mockService.verify(), 'listFoldersByCircle should be called once with the correct argument')
    }))
})
