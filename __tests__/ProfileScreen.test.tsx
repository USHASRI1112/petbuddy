import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Profile from '../src/screens/Profile/ProfileScreen';
import {UserContext} from '../src/Context/Context';
import {NavigationContainer} from '@react-navigation/native';
import * as Permissions from './../src/components/Permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { API_URL } from '../API';
import AddPetModal from '../src/components/AddPetModal';

jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  PERMISSIONS: {
    IOS: {
      PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
}));

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  openCamera: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  clean: jest.fn(() => Promise.resolve()),
  cleanSingle: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  openCamera: jest.fn(() =>
    Promise.resolve({path: '/mock/path', mime: 'image/jpeg'}),
  ),
  clean: jest.fn(() => Promise.resolve()),
  cleanSingle: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-fs', () => ({
  readDir: jest.fn(() => Promise.resolve([])),
  readFile: jest.fn(() => Promise.resolve('mocked file content')),
  writeFile: jest.fn(() => Promise.resolve()),
  unlink: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
  moveFile: jest.fn(() => Promise.resolve()),
}));

jest.mock('./../src/components/Permissions', () => ({
  requestPhotoLibraryPermission: jest.fn(),
}));

jest.mock('./../src/components/AddPetModal',()=>jest.fn())
global.fetch = jest.fn()
Alert.alert = jest.fn()

const user = {
  name: 'Usha',
  password: '1234',
  address: 'wgl',
  email: 'usha@gmail.com',
  contact: '1234567890',
  about: 'hi',
  image_uri: 'data:image/jpeg;base64,Base64EncodedImage',
  pets: [],
};

describe('Test for profile Screen', () => {
  it('should render Profile screen correctly when user context is provided', async () => {
    const setUser = jest.fn();

    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );
    expect(getByText(`${user.name}`)).toBeTruthy();
    expect(getByText(`✉ ${user.email}`)).toBeTruthy();
    expect(getByText(`📞 +91${user.contact}`)).toBeTruthy();
    expect(getByText('↩ Sign Out')).toBeTruthy();
    expect(getByTestId('profile-image')).toBeTruthy();
  });

  it('should call handleSignOut when Sign Out button is clicked', async () => {
    const setUser = jest.fn();
    const navigate = jest.fn();

    const {getByText} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const signOutButton = getByText('↩ Sign Out');
    fireEvent.press(signOutButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Main');
    });
  });

  it('should should handle no context case', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
      </NavigationContainer>,
    );

    expect(getByText('Something went wrong')).toBeTruthy();
  });
  it('should render error message when user is null', () => {
    const setUser = jest.fn();

    const {getByText} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user: null, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    expect(getByText('Something went wrong.')).toBeTruthy();
  });

  it('should navigate to mypets when clicked', async () => {
    const setUser = jest.fn();
    const navigate = jest.fn();

    const {getByText} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const myPetsButton = getByText('🐾 My Pets');
    fireEvent.press(myPetsButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Home');
    });
  });

  // it('should toggle Add Pet modal visibility when Add Pet is clicked', async () => {
  //   const setUser = jest.fn();

  //   const { getByText, getByTestId } = render(
  //     <NavigationContainer>
  //       <UserContext.Provider value={{ user, setUser }}>
  //         <Profile navigation={{ setOptions: jest.fn(), navigate: jest.fn() }} />
  //       </UserContext.Provider>
  //     </NavigationContainer>
  //   );
  //   expect(getByTestId('add-pet-modal')).toHaveProp('visible', false);

  //   const addPetButton = getByText('🐾 Add Pet');
  //   fireEvent.press(addPetButton);
  //   await waitFor(() => {
  //     expect(getByTestId('add-pet-modal')).toHaveProp('visible', true);
  //   });
  //   fireEvent.press(getByText('Close'));
  //   await waitFor(() => {
  //     expect(getByTestId('add-pet-modal')).toHaveProp('visible', false);
  //   });
  // });
});

describe('Test for adding profile image', () => {
  const mockCloseFn = jest.fn();
  const mockUsername = 'testUser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call handleImage and set photo when permission is granted and image is picked', async () => {
    const mockImagePath = 'path.jpg';
    const mockBase64Image = 'Base64EncodedImage';
    const setUser = jest.fn();

    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (ImageCropPicker.openPicker as jest.Mock).mockResolvedValue({
      path: mockImagePath,
    });
    (RNFS.readFile as jest.Mock).mockResolvedValue(mockBase64Image);

    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const uploadButton = getByTestId('handle-image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalledWith({
        width: 300,
        height: 400,
        cropping: true,
      });
      expect(RNFS.readFile).toHaveBeenCalledWith(mockImagePath, 'base64');
    });

    const profileImage = getByTestId('profile-image');
    expect(profileImage.props.source).toEqual({
      uri: `data:image/jpeg;base64,${mockBase64Image}`,
    });
  });

  it('should show an alert if permission is not granted', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      false,
    );

    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const uploadButton = getByTestId('handle-image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  it('should handle image picker cancellation', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (ImageCropPicker.openPicker as jest.Mock).mockRejectedValue({
      code: 'E_PICKER_CANCELLED',
    });

    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const uploadButton = getByTestId('handle-image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalled();
    });
  });

  it('should handle image picker error', async () => {
    (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
      true,
    );
    (ImageCropPicker.openPicker as jest.Mock).mockRejectedValue({
      code: 'UNKNOWN_ERROR',
      message: 'Some error occurred',
    });

    const setUser = jest.fn();
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <UserContext.Provider value={{user, setUser}}>
          <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
        </UserContext.Provider>
      </NavigationContainer>,
    );

    const uploadButton = getByTestId('handle-image');
    fireEvent.press(uploadButton);

    await waitFor(() => {
      expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
        1,
      );
      expect(ImageCropPicker.openPicker).toHaveBeenCalled();
    });
  });
  it('should toggle AddPetModal visibility when Add Pet button is pressed', () => {
    const setUser = jest.fn();
    const {getByText, queryByTestId} = render(
      <UserContext.Provider value={{user: user, setUser: setUser}}>
        <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
      </UserContext.Provider>,
    );

    const addPetButton = getByText('🐾 Add Pet');
    fireEvent.press(addPetButton);
    fireEvent.press(addPetButton);
    expect(queryByTestId('add-pet-modal')).toBeTruthy(); 
  });


  // it('should call uploadPic function and give success', async () => {
  //   const mockImagePath = 'path.jpg';
  //   const mockBase64Image = 'Base64EncodedImage';
  //   const mockSetUser = jest.fn();

  //   (Permissions.requestPhotoLibraryPermission as jest.Mock).mockResolvedValue(
  //     true,
  //   );
  //   (ImageCropPicker.openPicker as jest.Mock).mockResolvedValue({
  //     path: mockImagePath,
  //   });
  //   (RNFS.readFile as jest.Mock).mockResolvedValue(mockBase64Image);

  //   const {getByText, getByTestId} = render(
  //     <NavigationContainer>
  //       <UserContext.Provider value={{user, setUser:mockSetUser}}>
  //         <Profile navigation={{setOptions: jest.fn(), navigate: jest.fn()}} />
  //       </UserContext.Provider>
  //     </NavigationContainer>,
  //   );

  //   const uploadButton = getByTestId('handle-image');
  //   fireEvent.press(uploadButton);

  //   await waitFor(() => {
  //     expect(Permissions.requestPhotoLibraryPermission).toHaveBeenCalledTimes(
  //       1,
  //     );
  //     expect(ImageCropPicker.openPicker).toHaveBeenCalledWith({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //     });
  //     expect(RNFS.readFile).toHaveBeenCalledWith(mockImagePath, 'base64');
  //   });

  //   const profileImage = getByTestId('profile-image');
  //   expect(profileImage.props.source).toEqual({
  //     uri: `data:image/jpeg;base64,${mockBase64Image}`,
  //   });

  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       status: 200,
  //       json: jest.fn().mockResolvedValue({name: 'Usha', token: '1234'}),
  //     }),
  //   ) as jest.Mock;
    
    
  //   await waitFor(() => {
  //     expect(fetch).toHaveBeenCalled()
  //     // expect(fetch).toHaveBeenCalledWith(
  //     //   `${API_URL}user/profile/${user.name}`,{
  //     //     method: 'POST',
  //     //     headers: { 'Content-Type': 'application/json' },
  //     //     body: JSON.stringify({"profile":'data:image/jpeg;base64,Base64EncodedImage'})
  //     //   }
  //     // );
  //     //  expect(mockSetUser).toHaveBeenCalledWith(user);
  //     // expect(Alert.alert).toHaveBeenCalledWith('Pic uploaded succesffully');
  //   });
  // });
});
