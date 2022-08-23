import {  typesMsg } from './utils'

const data = {
    "grid_layout" : {
        'sub_0': [200, 400],
        'sub_1': [100, 200],
        'sub_2': [100, 600.0],
        'sub_3': [400, 800],
        'sub_4': [300, 200],
        'load_0_0': [20, 500],
        'load_3_1': [444, 431],
        'load_4_2': [250, 80],
        'gen_0_0': [240, 550],
        'gen_1_1': [30.0, 250]
    },
    "gird_num_info":{
        "n_gen" : 5,
        "n_load" : 11,
        "n_line" : 20,
    },
    "time_stamps":{
        "year" : 2019,
        "month" : 1,
        "day" : 6,
        "hour_of_day" : 0,
        "minute_of_hour" : 0,
    },
    "grid_info":{
        "line_status" : [ true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true ],
        "line_p_or" : [ 4.0707798e+01, 3.4871201e+01,  2.5377020e+01,  3.7496193e+01,
                      2.9901894e+01,  1.1478888e+01, -3.3143944e+01,  1.3214905e+01,
                      8.0508566e+00,  1.9815624e+01, -7.1048772e-01,  4.8118830e+00,
                      -9.6106367e+00,  2.5566595e+00,  9.5292444e+00,  2.1781700e+01,
                      1.2419695e+01,  2.3481386e+01, -1.2490009e-14, -2.1781700e+01],
        "line_a_or": [ 177.08029, 141.81856,  107.72723,  152.3783,   121.498886,  59.468212,
                      138.40173,  425.38623,  252.71758,  642.3019,    19.789661, 175.2324,
                      315.52786 ,  76.60076,  307.76926,  109.86134,   52.46547,   99.788956,
                      935.0104,   629.15857 ],
        "line_v_or" : [132.1,  124.1,   136.1,   141.1,   140.1 ,  142.1,
                      138.8432,    62,      62,        75,      68.046211,  21.046211,
                      21.052515,  21.575861,  21.423473, 138.8432,   138.8432,   139.63824,
                      14.840867,  21.046211, 21.046211, 75, 76, 20, 16, 38, 87, 30, 40],
        "line_connectivity_matrix" : [[ 8, -1, -1 ,10 ,-1 ,-1],
                                    [ 8 ,-1, -1, 11, -1, -1],
                                    [ 8, -1, -1, -1, 16, -1],
                                    [ 8, -1, -1 ,19 ,-1, -1],
                                    [ 8,  5, 7, -1, -1 ,-1]],
       "gen_info": {
           "gen_p" : [74.8,    73.8,      29.2,    0,    75.578995],
           "gen_q" : [142.1,    142.1,       22,     13.200001, 142.1 ],
           "gen_v" : [ 19.329943,  74.27505,   43.9601,    24.940077, -17.105919],
       },

       "load_info":
       {
            "load_p" : [22.4, 87.4, 47,  6.9, 11.6, 30.1,  8.9,  3.3 , 5.4, 12.5, 14.1],
            "load_q" : [15.6, 60.9, 32.2,  4.9 , 8.1 ,21.1,  6.2 , 2.4 , 3.8 , 8.7 ,10, ],
            "load_v" : [142.1,      142.1 ,     138.8432,   139.63824,   22,       21.046211,
            21.052515,  21.43466 ,  21.575861 , 21.423473,  20.71459 ],
            "load_pos_topo_vect" : [ 8, 12, 18, 23, 29, 39, 42, 45, 48, 52 ,55],
        }
 
    }
}


// lines： 图形中所有的连线
// nodes: 所有的节点（负载，发电单元，变电站）
const transformSourceData = (sourceData) => {
	const lines = []
	const nodes = {}
	if (sourceData.grid_layout) { // 存在节点的情况
		Object.keys(sourceData.grid_layout).forEach(nKey => {
			if (sourceData.grid_layout[nKey].length > 1) {
				const keyArrs = nKey.split('_') || []
				if (keyArrs.length > 2 && keyArrs[0] !== 'sub')  { // 节点为负载或者发电单元
					nodes[`${keyArrs[0]}_${keyArrs[keyArrs.length - 1]}`] = {
						id: keyArrs[keyArrs.length - 1],
						type: keyArrs[0],
						position: sourceData.grid_layout[nKey],
						...(typesMsg[keyArrs[0]])
					}
					if (keyArrs[0] === 'load') { // 负载
						lines.push({
							source: nodes[`sub_${keyArrs[1]}`],
							target: nodes[`${keyArrs[0]}_${keyArrs[keyArrs.length - 1]}`],
						})
					} else { // 发电单元
						lines.push({
							source:  nodes[`${keyArrs[0]}_${keyArrs[keyArrs.length - 1]}`],
							target:nodes[`sub_${keyArrs[1]}`],
						})
					}
				} else {
					nodes[nKey] = {
						id: keyArrs[keyArrs.length - 1],
						type: keyArrs[0],
						position: sourceData.grid_layout[nKey],
						...(typesMsg[keyArrs[0]])
					}
				}
			}
		})
	}
	if (sourceData.grid_info && sourceData.grid_info.line_connectivity_matrix) {
		const linesMatrix = sourceData.grid_info.line_connectivity_matrix || []
		if (linesMatrix.length) {
			linesMatrix.forEach((rowList, rowIndex) => {
				if (rowList.length) {
					rowList.forEach((colVal, colIndex) => {
						if ( Math.abs(colVal) === 1) { //表示rowIndex和colIndex之前存在连接关系
							lines.push({
								source: nodes[`sub_${rowIndex}`] || {},
								target: nodes[`sub_${colIndex}`] || {}
							})
						}
					})
				}
			})
		}
	}
	return {
		nodes,
		lines,
		sourceData
	}
}

const randomValue = (value) => {
  const judgeRandomValue =  parseInt((Math.random() * 10))
  let newData = value
  if (judgeRandomValue > 5) {
    newData = value + parseInt((Math.random() * 12))
  } else {
    newData = value - parseInt((Math.random() * 12))
  }
  if (newData > 0) {
    return newData
  } else {
    return 4
  }
}

const updateSourceData = (sourceData) => {
	const lineV = (sourceData.grid_info || {}).line_v_or || []
  if (lineV.length) {
    const newLineV = lineV.map(item => {
      return randomValue(item)
    })
    return {
      ...sourceData,
      grid_info: {
        ...sourceData.grid_info,
        line_v_or: newLineV
      }
    }
  }
  return sourceData
}

export default data
export {
	transformSourceData,
  updateSourceData
}