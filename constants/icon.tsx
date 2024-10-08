import React from "react";
import { View, Image } from "react-native";
import { Svg, Path } from "react-native-svg";
import { PropsWithChildren } from "react";

interface ICON{
  d?:string;
}

export const ArrowForward = ({d="24"}:ICON) => {
  return (
    <View>
      <Svg height={d} width={d} viewBox="0 -960 960 960" fill={"#ffffff"}>
        <Path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
      </Svg>
    </View>
  );
};

export const MenuIcon = ({d="24"}:ICON) => {
  return (
    <View>
      <Svg height={d} width={d} viewBox="0 -960 960 960" fill={"#ffffff"}>
        <Path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </Svg>
    </View>
  );
};

export const BackIcon = ({d="24"}:ICON) => {
  return (
    <View>
      <Svg height={d} width={d} viewBox="0 -960 960 960" fill={"#000000"}>
        <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </Svg>
    </View>
  );
};



