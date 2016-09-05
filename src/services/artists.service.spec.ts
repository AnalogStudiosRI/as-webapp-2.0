'use strict';
//import { ArtistInterface } from './artists.service';

describe('First Test Suite', () => {
  console.log('here!!!!!!!&&&&&');

  it('should pass', () => {
    let artist = {
      id: 1,
      name: 'Super Cat',
      bio: 'This bio'
    };

    expect(artist.name).toEqual('Super Cat');
  });

});