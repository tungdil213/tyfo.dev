import { test } from '@japa/runner'
import sinon from 'sinon';
import sinonTest from 'sinon-test';

import FolderService from '#services/folder_service'
import FolderRepository from '#repositories/folder_repository'
import Folder from '#models/folder';
import { create } from 'node:domain';

test.group('FolderService', (group) => {
    let service: FolderService
    let folderRepository: FolderRepository
    let stest = sinonTest(sinon, {})

    group.setup(async () => {
        folderRepository = new FolderRepository()
        service = new FolderService(folderRepository)
    })


    test("Test list folder by circle",
        stest(function () {
            var mockService = this.mock(folderRepository);
            mockService.expects('listByCircleUuid').once().withArgs('12345').returns(Promise.resolve([{
                uuid: '12345',
                name: 'Test Folder',
                description: 'This is a test folder'
            }]))

            service.listFoldersByCircle('12345');

            mockService.verify()

            //assert.isTrue(mockService.verify(), 'listFoldersByCircle should be called once with the correct argument')
        }))

    test("Test create folder",
        stest(function () {

            var newFolder = new Folder();
            newFolder.uuid = '12345';
            newFolder.name = 'Test Folder';
            newFolder.description = 'This is a test folder';



            var mockService = this.mock(folderRepository);

            mockService.expects('create').once().withArgs({
                uuid: sinon.match.any,
                name: 'Test Folder',
                description: 'This is a test folder',
                circleUuid: 1,
                userUuid: 1,
                createdAt: sinon.match.any
            })

            service.createFolder({
                name: 'Test Folder',
                description: 'This is a test folder',
                circleId: 1,
                userId: 1,
            })

            mockService.verify()

        }))

    test("Test update folder",
        stest(function () {


            var mockService = this.mock(folderRepository);

            mockService.expects('findByUuid').once().withArgs('12345').returns(
                Promise.resolve({
                uuid: '12345',
                name: 'Old Folder Name',
                description: 'This is an old folder',
                circleUuid: 1,
                userUuid: 1,
                createdAt: new Date()
                })
            )

            mockService.expects('update').once().withArgs({
                uuid: '12345',
                name: 'New Folder Name',
                description: 'This is a new folder',
                circleUuid: 1,
                userUuid: 1,
                createdAt: sinon.match.any,
                updatedAt: sinon.match.any
            })

         /*  mockSer.stub(folderRepository, 'findByUuid').resolves({
                uuid: '12345',
                name: 'Old Folder Name',
                description: 'This is an old folder',
                circleUuid: 1,
                userUuid: 1,
                createdAt: new Date()
                });*/

            service.updateFolder(
                '12345', {
                name: 'New Folder Name',
                description: 'This is a new folder',
                circleId: 1,
                userId: 1,
            })

            mockService.verify()

        }))
})
