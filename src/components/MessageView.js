import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';


/** assets */
import Colors from '../assets/colors';
import Fonts from '../assets/fonts';

const styles = StyleSheet.create({
  messageOuter: {
    height: 260,
    backgroundColor: Colors.darkenTiffany,
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messageText: {
    fontFamily: 'campton_semi_bold',
    fontSize: 30,
    padding: 10,
  },
  parcelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  parcelTextWhite: {
    fontFamily: 'campton_semi_bold',
    fontSize: 30,
    padding: 11,
    alignSelf: 'flex-start',
    color: Colors.lightLightTiffany,
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsText: {
    fontFamily: 'campton_semi_bold',
    fontSize: 20,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    color: Colors.tiffany,
  },
});

class MessageView extends PureComponent {
  render() {
    const {
      parcel,
      merchant,
      position,
      totPosition,
      loadingArea,
      message,
      messageColor,
      spinner,
    } = this.props;

    let backgroundColor = Colors.darkenTiffany;
    let detailsColor = Colors.tiffany;
    const border = {};
    // console.log('MessageView render', spinner);
    if (spinner) {
      return (
        <View style={[styles.messageOuter, { backgroundColor }, border]}>
          <ActivityIndicator size="large" color={Colors.lightGray} />
        </View>
      );
    }

    if (messageColor === Colors.pink) {
      backgroundColor = Colors.white;
      detailsColor = Colors.pink;
    } else if (messageColor === Colors.darkenTiffany) {
      backgroundColor = Colors.lightLightTiffany;
    } else if (messageColor === Colors.darkGray1) {
      backgroundColor = Colors.lightGray;
      detailsColor = Colors.darkenTiffany;
    }

    return (
      <View style={[styles.messageOuter, { backgroundColor }, border]}>
        <View style={[styles.container, { backgroundColor }]}>
          {(loadingArea || position)
          && (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {loadingArea
            && (
            <Text style={[styles.parcelTextWhite, { backgroundColor: messageColor, margin: 5 }]}>
              {`${loadingArea}.${position}`}
            </Text>
            )
            }
            <View style={{ height: 80, margin: 5, marginLeft: 10 }}>
              {position
              && (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={[styles.messageText, { width: 100, fontSize: 22, padding: 5, color: detailsColor }]}>
                    {`di ${totPosition} step`}
                  </Text>
                </View>
              </View>
              )
              }
            </View>
          </View>
          )
          }
          <Text style={[styles.messageText, { color: messageColor }]}>
            {message}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, height: 100 }}>
              <View style={styles.parcelContainer}>
                {parcel
                && <Text style={[styles.detailsText, { color: detailsColor }]}>{parcel}</Text>
                }
                {merchant
                && <Text style={[styles.detailsText, { color: detailsColor }]}>{merchant}</Text>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

MessageView.propTypes = {
  parcel: PropTypes.string,
  message: PropTypes.string,
  messageColor: PropTypes.string,
  spinner: PropTypes.bool,
};

MessageView.defaultProps = {
  parcel: null,
  message: '',
  messageColor: Colors.white,
  spinner: false,
};

export default MessageView;
