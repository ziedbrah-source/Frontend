import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Icon from '../components/Icon';
import { materialTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={require('../assets/images/user-profile.jpg')}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}
          >
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                  John Doe
                </Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">
                        Pro
                      </Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>
                      Security Camera User
                    </Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon
                        name="map-marker"
                        family="font-awesome"
                        color={theme.COLORS.MUTED}
                        size={16}
                      />
                      {` `} Tunis,Tunisia
                    </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                style={styles.gradient}
              />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="around" style={{ padding: theme.SIZES.BASE }}>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  5
                </Text>
                <Text muted size={12}>
                  Notifications
                </Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>
                  2
                </Text>
                <Text muted size={12}>
                  Cameras
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: 'baseline' }}
            >
              <Text size={16}>Your Account:</Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block
                row
                space="between"
                style={{ flexWrap: 'wrap', alignItems: 'center' }}
              >
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="black" size={20} />
                  <Text
                    color="white"
                    style={[
                      styles.textInput,
                      {
                        color: 'black',
                      },
                    ]}
                  >
                    Zied
                  </Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="user-o" color="black" size={20} />
                  <Text
                    color="white"
                    style={[
                      styles.textInput,
                      {
                        color: 'black',
                      },
                    ]}
                  >
                    Brahmi
                  </Text>
                </View>
                <View style={styles.action}>
                  <Feather name="phone" color="black" size={20} />
                  <Text
                    color="white"
                    style={[
                      styles.textInput,
                      {
                        color: 'black',
                      },
                    ]}
                  >
                    29370926
                  </Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="envelope-o" color="black" size={20} />
                  <Text
                    color="white"
                    style={[
                      styles.textInput,
                      {
                        color: 'black',
                      },
                    ]}
                  >
                    zied@zied.com
                  </Text>
                </View>
                <View style={styles.action}>
                  <FontAwesome name="globe" color="black" size={20} />
                  <Text
                    color="white"
                    style={[
                      styles.textInput,
                      {
                        color: 'black',
                      },
                    ]}
                  >
                    Tunisia
                  </Text>
                </View>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },

  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },

  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  container: {
    flex: 1,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
