import { SET_GROUP_DETAILS, SET_USER_GROUPS,
  SET_MEMBER_COUNT, PASS_MESSAGE,
  SET_CURRENT_USER, SET_MESSAGE } from '../actions/types';

export default ({
  eventObject: {
    preventDefault: jest.fn()
  },
  action: {
    emptyAction: [],
    getGroupsResponse: {
      data: [{
        group: {
          id: 1,
          name: 'Andela',
          description: 'A group for Andela'
        },
        unreadCount: 4
      }]
    },
    groupDetails: [{
      group: {
        id: 1,
        name: 'Andela',
        description: 'A group for Andela',
      },
      unreadCount: 4
    }],
    getGroupAction: [
      { type: SET_USER_GROUPS,
        groupDetails: [{
          group: {
            id: 1,
            name: 'Andela',
            description: 'A group for Andela',
          },
          unreadCount: 4
        }] }
    ],
    getMemberCountResponse: {
      success: true,
      data: 2
    },
    groupMemberCount: 2,
    getMemberCountAction: [
      { type: SET_MEMBER_COUNT, count: 2 }
    ],
    getMessagesResponse: {
      success: true,
      data: [{
        id: 1,
        title: 'Mwanzo of Awesomeness ',
        message: 'this is it',
        priority: 'urgent',
        author: 'chuks',
        readby: ['chuks']
      }]
    },
    messageDetails: [{
      id: 1,
      title: 'Mwanzo of Awesomeness ',
      message: 'this is it',
      priority: 'urgent',
      author: 'chuks',
      readby: ['chuks']
    }],
    groupId: 5,
    setGroupDetailAction: [{
      type: SET_GROUP_DETAILS,
      groupDetails: 5
    }],
    passMessageAction: [{
      type: PASS_MESSAGE,
      messageObject: [{
        id: 1,
        title: 'Mwanzo of Awesomeness ',
        message: 'this is it',
        priority: 'urgent',
        author: 'chuks',
        readby: ['chuks']
      }]
    }],
    searchPayload: {
      username: 'chuks',
      offset: 0,
      limit: 2
    },
    decodedToken: {
      id: 1,
      username: 'chuks',
      email: 'chuks@email.com',
    },
    signinResponse: {
      success: true,
      message: 'Sign in succesful.',
      token: '0SX6NVMqqQpgdUebW3'
    },
    signinAction: [
      { type: SET_CURRENT_USER }
    ],
    logoutAction: [
      { type: SET_CURRENT_USER, user: {} }
    ],
    auth: {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'chuks',
        email: 'chuks@andela.com',
      }
    },
    userData: {
      id: 1,
      email: 'chuks@andela.com',
      username: 'chuks'
    },
    signupAction: { type: SET_CURRENT_USER,
      user: {
        id: 1,
        username: 'chuks',
        email: 'chuks@andela.com',
      } },
    userSignupData: {
      username: 'chuks',
      email: 'chuks@andela.com',
      password: 'password',
      phone: '2347033130448'
    }
  },
  componentData: {
    addUser: {
      userStore: {
        auth: { user: { username: 'chuks' } },
        groupDetails: [1, 'HNG', 'chuks']
      },
      props: {
        groupId: 1,
        findUser: jest.fn(() => Promise.resolve({ data: { user: {
          id: 1,
          username: 'troy34',
          Groups: []
        } } })),
        addUser: jest.fn(() => Promise.resolve()),
        removeUser: jest.fn(() => Promise.resolve())
      },
      errorResponse: { error: 'user already belongs to this group' },
      onChangeTarget: {
        target: { name: 'username', value: 'troy34' }
      }
    },
    createGroupForm: {
      props: {
        createGroup: jest.fn(() => Promise.resolve()),
      },
      errorResponse: { errors: { group: 'group already exists' } },
      onChangeTarget: {
        target: {
          name: 'name', value: 'Andela'
        }
      },
      failedRequest: {
        data: {
          success: false,
          errors: 'No cant do'
        }
      }
    },
    dashboardPage: {
      props: {
        getGroups: jest.fn(() => Promise.resolve()),
        setGroupDetail: jest.fn(),
        setGroupToStore: jest.fn(),
        getMessages: jest.fn(() => Promise.resolve()),
        groups: [{
          group: {
            id: 2,
            name: 'HNG',
            description: "A group for HNG's Factory product"
          },
          unreadCount: 0
        }],
        history: { push: jest.fn() }
      },
      store: {
        auth: { user: {} },
        groups: []
      },
      onClickEvent: {
        target: {
          dataset: { id: 3 }
        }
      }
    },
    groupCard: {
      props: {
        onClick: jest.fn(),
        group: {
          group: {
            id: 9,
            name: 'true love',
            description: 'a group description'
          },
          unreadCount: 0
        }
      },

    },
    groupPage: {
      store: {
        groupDetails: [1],
        auth: { user: {} },
        groupMemberCount: 4,
        message: []
      },
      props: {
        groupDetails: [3, 'HNG'],
        getMessages: jest.fn(() => Promise.resolve()),
        passMessage: jest.fn(),
        updateReadBy: jest.fn(),
        getMemberCount: jest.fn(),
        user: {
          username: 'chuks'
        },
        messages: []
      },
      message: [{
        id: 9,
        title: 'true love',
        message: 'true lovers',
        priority: 'urgent',
        author: 'chuks',
        readby: ['chuks'],
        createdAt: '2017-08-27T19:49:14.760Z',
        updatedAt: '2017-08-27T19:49:14.760Z',
        groupId: 1,
        userId: 1
      },
      {
        id: 1,
        title: 'Title fight',
        message: 'Title fighters',
        priority: 'urgent',
        author: 'chuks',
        readby: ['dave'],
        createdAt: '2017-08-27T19:49:14.760Z',
        updatedAt: '2017-08-27T19:49:14.760Z',
        groupId: 1,
        userId: 1
      }],
      onClickEvent: {
        target: {
          value: 'unread',
          name: 'filter-message',
          dataset: {
            readby: 'dave'
          }
        }
      },
      onChangeTarget: {
        target: {
          value: 'unread', name: 'filter-message'
        }
      },
      nextProps: {
        messages: [{
          id: 46,
          title: 'Hello World',
          message: 'from the other side',
          priority: 'normal',
          author: 'chuks',
          readby: ['chuks'],
          groupId: 1,
          userId: 2
        }]
      },
      failedResponse: {
        data: { error: 'No group found' }
      }
    },
    homePage: {
      store: {
        auth: {}
      },
      props: {
        userSignupRequest: jest.fn(),
        auth: {
          isAuthenticated: true
        }
      }
    },
    messageCard: {
      props: {
        onClick: jest.fn(),
        message: {
          id: 9,
          title: 'true love',
          message: 'true lovers',
          priority: 'urgent',
          author: 'chuks',
          readby: [
            'chuks'
          ],
          createdAt: '2017-08-27T19:49:14.760Z',
          updatedAt: '2017-08-27T19:49:14.760Z',
          groupId: 1,
          userId: 1
        }
      }
    },
    messageContent: {
      props: {
        onClick: jest.fn(),
        message: {
          id: 9,
          title: 'true love',
          message: 'true lovers',
          priority: 'urgent',
          author: 'chuks',
          readby: [
            'chuks'
          ],
          createdAt: '2017-08-27T19:49:14.760Z',
          updatedAt: '2017-08-27T19:49:14.760Z',
          groupId: 1,
          userId: 1
        }
      }
    },
    messagePage: {
      store: {
        message: {
          message: {
            title: 'hi'
          }
        }
      },
      message: {
        title: 'Message Title',
        message: ' body',
        priority: 'normal',
        createdAt: '2017-08-19T16:37:06.603Z'
      },
      props: {
        history: { push: jest.fn() }
      }
    },
    postMessage: {
      store: {
        auth: { user: {} }
      },
      props: {
        postMessage: jest.fn(() => Promise.resolve())
      },
      onChangeTarget: {
        target: {
          name: 'priority', value: 'normal'
        }
      },
      failedRequest: {
        status: 403,
        data: {
          success: false,
          message: 'No cant do'
        }
      }
    },
    renderUser: {
      props: {
        user: {
          username: 'chuks',
          email: 'chuks@andela.com',
          phone: '2347033130449',
          Groups: []
        }
      }
    },
    resetPassword: {
      props: {
        resetPassword: jest.fn(() => Promise.resolve())
      },
      onChangeTarget: {
        target: {
          name: 'email', value: 'chuks24ng@yahoo.co.uk'
        }
      },
      requestState: { password: 'newpass', confirmPassword: 'newpass' },
      unmatchingPassword: {
        password: 'newpass', confirmPassword: 'strongpass'
      },
      shortPassword: { password: 'stro', confirmPassword: 'stro' },
      initialState: { initial: true, secondary: false },
      secondaryState: { initial: false, secondary: true },
      failedRequest: {
        response: { data: { error: 'Email exists' } }
      }
    },
    searchForm: {
      props: {
        onClick: jest.fn(),
        onSubmit: jest.fn(),
        state: {
          group: {
            username: '',
            errors: '',
          }
        }
      }
    },
    searchPage: {
      props: {
        searchUserAction: jest.fn(() => Promise.resolve())
      },
      searchResponse: { count: 5,
        limit: 2,
        users: [{
          id: 1,
          username: 'chuks'
        }] },
      onChangeTarget: {
        target: {
          name: 'username', value: 'chuks'
        }
      },
      paginationEvent: {
        target: { id: 3 }
      },
      failedRequest: {
        response: {
          data: { error: 'No user found' }
        }
      }
    },
    sidebar: {
      store: {
        auth: { user: {} },
        groups: []
      },
      props: {
        auth: {
          isAuthenticated: true,
          user: {
            id: 1,
            email: 'chuks.opia@andela.com',
            username: 'chuks'
          }
        },
        logout: jest.fn(() => Promise.resolve()),
        createGroup: jest.fn(() => Promise.resolve())
      }
    },
    signinForm: {
      props: {
        Login: jest.fn(() => Promise.resolve())
      },
      errorState: { errors: { message: 'an error' } },
      onChangeTarget: {
        target: {
          name: 'username', value: 'chuks'
        }
      },
      failedRequest: {
        errors: { username: 'not exist' }
      }
    },
    signupForm: {
      props: {
        userSignupRequest: jest.fn(() => Promise.resolve())
      },
      onChangeTarget: {
        target: {
          name: 'username', value: 'chuks'
        }
      },
      submitState: { phone: '12345678901',
        password: 'wertyuit',
        username: 'chuks',
        email: 'chuks@andela.com' },
      phoneErrorState: { phone: '1234567', password: 'wertyui' },
      passwordErrorState: { phone: '12345678901', password: 'werty' },
      usernameError: { errors: { username: 'Username does not exist' } },
      emailError: { errors: { email: 'email does not exist' } },
      failedRequest: {
        data: { errors: { username: 'does not exist' } }
      }
    },
    signupModal: {
      props: {
        userSignupRequest: jest.fn(() => Promise.resolve())
      }
    }
  },
  reducer: {
    emptyInitialState: [],
    authInitialState: {
      isAuthenticated: false,
      user: {}
    },
    setCurrentUser: {
      type: SET_CURRENT_USER,
      user: {
        id: 1,
        email: 'chuks@andela.com',
        username: 'chuks'
      }
    },
    setCurrentUserAction: {
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'chuks@andela.com',
        username: 'chuks'
      }
    },
    groupDetailInitialState: {
      details: ''
    },
    setGroupDetail: {
      type: SET_GROUP_DETAILS,
      groupDetails: [1, 'Grouppie']
    },
    setGroupDetailAction: [1, 'Grouppie'],
    setUserGroup: {
      type: SET_USER_GROUPS,
      groups: [{
        id: 1,
        name: 'group name'
      }]
    },
    setMemberCount: {
      type: SET_MEMBER_COUNT,
      count: 3
    },
    passMessage: {
      type: PASS_MESSAGE,
      messageObject: {
        title: 'The End',
        message: 'this is the end'
      }
    },
    passMessageAction: {
      message: {
        message: 'this is the end',
        title: 'The End'
      }
    },
    setMessage: {
      type: SET_MESSAGE,
      messages: {
        title: 'The End',
        message: 'this is the end'
      }
    },
    setMessageAction: {
      message: 'this is the end',
      title: 'The End'
    }
  }
});
