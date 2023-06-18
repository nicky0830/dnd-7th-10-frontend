import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import { ColorPalette, Typo } from '../../styles/variable'
import { shadow } from '../../styles/backgrounds'
import { IRemind } from './Notice'
const AlarmCardView = styled.View`
  width: 140px;
  height: 179px;
  background: #ffffff;
  box-shadow: ${shadow};
  border-radius: 4px;
  margin: 8px;
`

const AlarmText = styled.Text`
  position: absolute;
  width: 88px;
  height: 48px;
  left: 16px;
  top: 44px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_5};
`

const DayText = styled.Text`
  position: absolute;
  width: 116px;
  height: 17px;
  left: 16px;
  top: 108px;
  font-family: ${Typo.Detail1_400};
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4};
`

const LinkNum = styled.Text`
  position: absolute;
  width: 30px;
  height: 14px;
  right: 16px;
  bottom: 16px;
  font-family: ${Typo.Detail2_400};
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: -0.6px;
  color: #${ColorPalette.BlueGray_3};
`

interface Props {
  remind: IRemind
}

const AlarmCard = ({ remind }: Props) => {
  const [time, setTime] = useState<string>('')
  const [dayList, setDayList] = useState<string>('')

  useEffect(() => {
    const cron = remind.cron.split(' ')
    let min = cron[1]
    if (min.length === 1) {
      min = '0' + min
    }
    let hour = cron[2]
    if (hour.length === 1) {
      hour = '0' + hour
    }
    let days = cron[5].split(',')
    let week: string[] = []
    let ampm = ''

    if (Number(hour) > 12) {
      ampm = 'PM'
      hour = String(Number(hour) - 12)
    } else {
      ampm = 'AM'
    }

    days.map(day => {
      if (day === 'MON') {
        week.push('월')
      }
      if (day === 'TUE') {
        week.push('화')
      }
      if (day === 'WED') {
        week.push('수')
      }
      if (day === 'THU') {
        week.push('목')
      }
      if (day === 'FRI') {
        week.push('금')
      }
      if (day === 'SAT') {
        week.push('토')
      }
      if (day === 'SUN') {
        week.push('일')
      }

      console.log(remind.cron)
      console.log(hour, min, '\n\n')

      setTime(`${ampm}\n${hour}:${min}`)
      setDayList(week.join(' '))
    })
  }, [])

  // const onPress = () => {
  //   /* console.log('press') */
  // }

  //초 분 시
  return (
    <AlarmCardView>
      {/* <Toggle>
        <Circle onPress={onPress} />
      </Toggle> */}
      <AlarmText>{time}</AlarmText>
      <DayText>{dayList}</DayText>
      <LinkNum>{remind.articleList.length + '개'}</LinkNum>
    </AlarmCardView>
  )
}

export default AlarmCard