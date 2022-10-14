import moment from 'moment';

export function convertMetaDataToOptions(options: any) {
  // let newOptions: any = [];
  // const array = [options[1]];
  //
  // array[0].description = 'Only Select an Ingredient to Remove or Modify';
  //
  // array[0].options = [

  // const array = [
  //   {
  //     adjustsparentcalories: false,
  //     customDropDown: true,
  //     adjustsparentprice: false,
  //     availability: {
  //       always: true,
  //       description: null,
  //       enddate: null,
  //       isdisabled: false,
  //       now: true,
  //       startdate: null,
  //     },
  //     basecalories: null,
  //     caloriesseparator: null,
  //     chainoptionid: 4025608,
  //     children: true,
  //     cost: 0,
  //     costoverridelabel: null,
  //     displayid: null,
  //     fields: null,
  //     id: 5773103757,
  //     isdefault: false,
  //     maxcalories: null,
  //     menuitemlabels: [],
  //     metadata: [
  //       {
  //         key: 'navigation-style',
  //         value: 'inline',
  //       },
  //     ],
  //     modifiers: [
  //       {
  //         availability: {
  //           always: true,
  //           description: null,
  //           enddate: null,
  //           now: true,
  //           startdate: null,
  //         },
  //         chainmodifierid: 809898,
  //         choicequantityincrement: '1',
  //         description: 'Modify Bacon',
  //         explanationtext: null,
  //         hidechoicecost: false,
  //         id: 1288985286,
  //         mandatory: true,
  //         maxaggregatequantity: null,
  //         maxchoicequantity: '',
  //         maxselects: null,
  //         metadata: null,
  //         minaggregatequantity: null,
  //         minchoicequantity: '',
  //         minselects: null,
  //         options: [
  //           {
  //             adjustsparentcalories: false,
  //             adjustsparentprice: false,
  //             availability: {
  //               always: true,
  //               description: null,
  //               enddate: null,
  //               isdisabled: false,
  //               now: true,
  //               startdate: null,
  //             },
  //             basecalories: null,
  //             caloriesseparator: null,
  //             chainoptionid: 4025628,
  //             children: false,
  //             cost: 0,
  //             costoverridelabel: null,
  //             displayid: null,
  //             fields: null,
  //             id: 5773107030,
  //             isdefault: false,
  //             maxcalories: null,
  //             menuitemlabels: [],
  //             metadata: null,
  //             modifiers: null,
  //             name: 'Remove',
  //           },
  //           {
  //             adjustsparentcalories: false,
  //             adjustsparentprice: false,
  //             availability: {
  //               always: true,
  //               description: null,
  //               enddate: null,
  //               isdisabled: false,
  //               now: true,
  //               startdate: null,
  //             },
  //             basecalories: null,
  //             caloriesseparator: null,
  //             chainoptionid: 4025629,
  //             children: false,
  //             cost: 0,
  //             costoverridelabel: null,
  //             displayid: null,
  //             fields: null,
  //             id: 5773107031,
  //             isdefault: false,
  //             maxcalories: null,
  //             menuitemlabels: [],
  //             metadata: null,
  //             modifiers: null,
  //             name: 'On The Side',
  //           },
  //           {
  //             adjustsparentcalories: false,
  //             adjustsparentprice: true,
  //             availability: {
  //               always: true,
  //               description: null,
  //               enddate: null,
  //               isdisabled: false,
  //               now: true,
  //               startdate: null,
  //             },
  //             basecalories: null,
  //             caloriesseparator: null,
  //             chainoptionid: 4025630,
  //             children: false,
  //             cost: 1,
  //             costoverridelabel: null,
  //             displayid: null,
  //             fields: null,
  //             id: 5773107032,
  //             isdefault: false,
  //             maxcalories: null,
  //             menuitemlabels: [],
  //             metadata: null,
  //             modifiers: null,
  //             name: 'Extra',
  //           },
  //         ],
  //         parentchoiceid: null,
  //         supportschoicequantities: false,
  //       },
  //     ],
  //     description: 'remove or modify',
  //     name: 'remove or modify',
  //   },
  // ];
  //
  // let newArray = options;
  // newArray[1].options.push(array[0]);
  //
  // console.log('array', array);
  //
  // return newArray;

  let newArray = options;

  const metaKeys = ['display-group-name', 'display-group-option-name'];
  let startId = 555500000000;
  for (let i = 0; i < options.length; i++) {
    let filteredOptions: any = [];
    let newOptions: any = [];
    let groupNames: any = [];
    newOptions = options[i].options.map((option: any, index: any) => {
      if (option.metadata && option.metadata.length) {
        let filteredMeta: any = [];
        const newOptionObj = {
          ...option,
        };
        option.metadata.forEach((meta: any) => {
          if (metaKeys.includes(meta.key)) {
            if (meta.key === metaKeys[0]) {
              newOptionObj.name = meta.value;
            }
            if (meta.key === metaKeys[1]) {
              newOptionObj.groupName = meta.value;
            }
            filteredMeta.push(meta);
            if (meta.key === metaKeys[1] && !groupNames.includes(meta.value)) {
              groupNames.push(meta.value);
            }
          }
        });
        if (filteredMeta.length === 2) {
          filteredOptions.push(newOptionObj);
          return {};
        } else {
          return option;
        }
      } else {
        return option;
      }
    });
    if (filteredOptions.length) {
      let optionList: any = [];
      groupNames.forEach((group: string, index: number) => {
        const filterOptionsFinal = filteredOptions.filter(
          (option: any) => option.groupName === group,
        );
        const id = startId + 100;
        startId = id;
        const newParentObj = {
          adjustsparentcalories: false,
          customDropDown: true,
          adjustsparentprice: false,
          availability: {
            always: true,
            description: null,
            enddate: null,
            isdisabled: false,
            now: true,
            startdate: null,
          },
          basecalories: null,
          caloriesseparator: null,
          chainoptionid:
            filterOptionsFinal && filterOptionsFinal.length
              ? filterOptionsFinal[0].chainoptionid
              : moment().unix() * (index + 10) + 500,
          children: true,
          cost: 0,
          costoverridelabel: null,
          displayid: null,
          fields: null,
          id: id,
          isdefault:
            (filterOptionsFinal &&
              filterOptionsFinal.length &&
              filterOptionsFinal[0].isdefault) ||
            false,
          maxcalories: null,
          menuitemlabels: [],
          metadata: [
            {
              key: 'navigation-style',
              value: 'inline',
            },
          ],
          modifiers: [
            {
              availability: {
                always: true,
                description: null,
                enddate: null,
                now: true,
                startdate: null,
              },
              chainmodifierid: moment().unix() + 1500,
              choicequantityincrement: '1',
              description: '',
              explanationtext: null,
              hidechoicecost: false,
              id: moment().unix() + 220,
              mandatory: true,
              maxaggregatequantity: null,
              maxchoicequantity: '',
              maxselects: null,
              metadata: null,
              minaggregatequantity: null,
              minchoicequantity: '',
              minselects: null,
              options: filterOptionsFinal,
              parentchoiceid: null,
              supportschoicequantities: false,
            },
          ],
          description: '',
          name: group,
        };
        optionList.push(newParentObj);
      });
      optionList.forEach((opt: any) => {
        for (let i = 0; i < newOptions.length - 1; i++) {
          if (Object.keys(newOptions[i]).length === 0) {
            newOptions[i] = opt;
            break;
          }
        }
      });

      newOptions = newOptions.filter(
        (value: any) => Object.keys(value).length !== 0,
      );
      newArray[i].options = newOptions;
    }
  }
  return newArray;
}
