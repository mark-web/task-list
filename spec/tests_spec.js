describe('app mainController', function(){
  describe('Testing a mainController', function() {

    var ctrl, 
        scope, 
        httpMock;
    
    // Load our app module definition before each test.
    beforeEach(module('appControllers'));
    
    beforeEach(inject(function($injector) {
      
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '../data/task.json')
          .respond([
              {
                  "id": 1,
                  "name": "Today_task1",
                  "creation_date": "2015-04-21T06:50:21",
                  "due_date": "2015-04-22T23:59:00",
                  "start_date": "2015-04-21T00:00:01",
                  "is_completed": false,
                  "is_archived": false,
                  "estimated_effort": 5.5,
                  "actual_effort": 3.3,
                  "physical_progress": 60,
                  "obj_status": "active",
                  "description": "Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit",
                  "project_id": 0
              },
              {
                  "id": 11,
                  "name": "Today_task11",
                  "creation_date": "2015-04-21T06:50:21",
                  "due_date": "2015-04-22T23:59:00",
                  "start_date": "2015-04-21T00:00:01",
                  "is_completed": false,
                  "is_archived": false,
                  "estimated_effort": 5.5,
                  "actual_effort": 3.3,
                  "physical_progress": 60,
                  "obj_status": "active",
                  "description": "Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit",
                  "project_id": 0,
                  "tags": [
                      "meeting"
                  ]
              }
        ]);
      
        scope = $injector.get('$rootScope').$new();
      
        ctrl = $injector.get('$controller');
        ctrl('mainController', {$scope: scope});
      
    }));

    it("gets the list from the api and assigns it to scope", function() {
      httpMock.expectGET('../data/task.json');
      httpMock.flush();
      
      expect(scope.taskEvent).toEqual([
          {
              "id": 1,
              "name": "Today_task1",
              "creation_date": "2015-04-21T06:50:21",
              "due_date": "2015-04-22T23:59:00",
              "start_date": "2015-04-21T00:00:01",
              "is_completed": false,
              "is_archived": false,
              "estimated_effort": 5.5,
              "actual_effort": 3.3,
              "physical_progress": 60,
              "obj_status": "active",
              "description": "Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit",
              "project_id": 0
          },
          {
              "id": 11,
              "name": "Today_task11",
              "creation_date": "2015-04-21T06:50:21",
              "due_date": "2015-04-22T23:59:00",
              "start_date": "2015-04-21T00:00:01",
              "is_completed": false,
              "is_archived": false,
              "estimated_effort": 5.5,
              "actual_effort": 3.3,
              "physical_progress": 60,
              "obj_status": "active",
              "description": "Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit",
              "project_id": 0,
              "tags": [
                  "meeting"
              ]
          }
      ]);
      
    });
  });
});

//test for tasks list
describe('Unit testing great quotes', function() {
    var $compile,
        $rootScope;

    beforeEach(module('app_Tests'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var element = $compile("<task-list></task-list>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
        expect(element.length).toEqual(1);
    });
});

//test for task tedails
describe('Unit testing great quotes', function() {
    var $compile,
        $rootScope;

    beforeEach(module('app_Tests'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var element = $compile("<task-details></task-details>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
        expect(element.length).toEqual(1);
    });
});