/*
 * @LastEditTime: 2020-12-14 15:08:39
 * @LastEditors: jinxiaojian
 */
const data = {
  id: '0',

  children: [
    {
      id: 1,

      children: [
        {
          id: 11,

          children: [
            {
              id: 111,

            },
            {
              id: 112,

            },
            {
              id: 113,

            },
            {
              id: 114,

            },
            {
              id: 115,

            }
          ]
        },
        {
          id: 12,

          children: [
            {
              id: 121,

            },
            {
              id: 122,
              children: [
                {
                  id: 1221,
                  children: [
                    {
                      id: 12211
                    },
                    {
                      id: 12212
                    }
                  ]
                }
              ]

            }
          ]
        },
        {
          id: 13,

          children: [
            {
              id: 131,

            },
            {
              id: 132,
        

            }
          ]
        }
      ]
    },
    {
      id: 2,

      children: [
        {
          id: 21,
          children: [
            {
              id: 211,
              children: [
                { id: 2111 ,type:1},
                { id: 2112 ,type:2},
                { id: 2113 }

              ]
            }
          ]
        }
      ]
    }
  ]
}