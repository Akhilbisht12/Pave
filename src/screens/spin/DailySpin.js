import {View, Image} from 'react-native';
import React from 'react';
import FortuneWheel from './FortuneWheel';
import {SillyText, SillyView} from '../../Silly/components/silly_comps';
import silly from '../../Silly/styles/silly';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clr1, clr5} from '../../config/globals';
import spin_wheel from '../../assets/illustrations/spin_wheel_daily.png';
import {useEffect} from 'react';
import axios from 'axios';
import {server} from '../../config/server_url';
import {useState} from 'react';
import AuthContext from '../../navigations/AuthContext';
import {useContext} from 'react';
import SillyModal from '../../Silly/components/SillyModal';

const DailySpin = () => {
  const {state} = useContext(AuthContext);
  const {user_id} = state;
  const [fortunes, setFortunes] = useState([]);
  const [points, setPoints] = useState(0);
  const [open, setOpen] = useState(false);
  const [win, setWin] = useState();
  useEffect(() => {
    const getFortunes = async () => {
      try {
        const fortunesres = await axios.get(
          `${server}/earning/spin-wheel-options/`,
        );
        console.log(fortunesres.data);
        setFortunes(prev => {
          prev = fortunesres.data;
          return [...prev];
        });
        const pointsres = await axios.get(
          `${server}/earning/overview/${user_id}/`,
        );
        setPoints(pointsres.data.points);
      } catch (error) {
        console.log(error);
      }
    };
    getFortunes();
  }, [user_id]);

  const handleOpenModel = winnner => {
    setOpen(true);
    setWin(winnner);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <View style={[silly.f1, silly.jcaround]}>
      <SillyView
        bg={`${clr1}40`}
        px={20}
        style={[silly.fr, silly.jcbtw, silly.aic, silly.h15p]}>
        <View>
          <Image source={spin_wheel} style={[silly.w40p, silly.rmcon]} />
        </View>
        <View>
          <SillyText color={clr1}>WIN UPTO</SillyText>
          <SillyText size={45} family="SemiBold" color={clr1}>
            ₹700
          </SillyText>
        </View>
      </SillyView>
      <View style={[silly.aic]}>
        {/* spins left view */}
        <SillyView
          bg="transparent"
          style={[
            silly.fr,
            silly.jcaround,
            silly.aic,
            silly.bc3,
            silly.bw2,
            silly.w70p,
          ]}>
          <View style={[silly.fr, silly.aic]}>
            <Ionicons name="timer" color={clr5} size={20} />
            <SillyText mx={5} color={clr5} size={18}>
              {Math.round(points / 500)} Spins left
            </SillyText>
          </View>
          <SillyView px={1} py={15} />
          <View style={[silly.fr, silly.aic]}>
            <Ionicons name="star" color={clr5} size={20} />

            <SillyText color={clr5} size={18} mx={5}>
              {points} points
            </SillyText>
          </View>
        </SillyView>
      </View>

      {/* spin wheel view */}
      <View style={[silly.h50p, silly.aic, silly.jcc]}>
        {/* <SpinWheel /> */}
        {fortunes.length === 0 ? null : (
          <FortuneWheel
            handleOpenModel={handleOpenModel}
            fortunes={fortunes}
            spinType={true}
          />
        )}
      </View>
      <SillyModal win={win} open={open} setOpen={handleCloseModal} />
    </View>
  );
};

export default DailySpin;
