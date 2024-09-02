
RSpec.describe PlantquestSDK::Client do  
  before(:each) do
    PlantquestSDK.configure do |config|
      config[:apikey] = 'test_api_key'
      config[:endpoint] = 'http://example.com'
    end
    @client = PlantquestSDK::Client.new
  end

  describe '.configure' do
    it 'creates a new client with the given options' do
      expected_options = { apikey: 'test_api_key', endpoint: 'http://example.com' }
      expect(@client).to be_a(PlantquestSDK::Client)
      expect(@client.options.reject { |key, _| key == :fetch }).to eq(expected_options)
    end

    it 'merges the options with the default options' do
      another_client = PlantquestSDK::Client.new(apikey: 'another_api_key')
      expect(another_client.options.reject { |key, _| key == :fetch }).to eq({ apikey: 'another_api_key', endpoint: 'http://example.com' })
    end
  end

  describe '#initialize' do
    it 'sets the options' do
      expected_options = { apikey: 'test_api_key', endpoint: 'http://example.com' }
      expect(@client.options.reject { |key, _| key == :fetch }).to eq(expected_options)
    end
  end


    describe 'asset-load' do
      it 'loads the entity with the correct data' do
        stub_request(:get, "http://example.com/asset/t01")
        .to_return(body: { id: 't01', title: 'T01' }.to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Asset.load(id: 't01')
        expect(out.data).to eq({ id: 't01', title: 'T01' })
      end
    end

    describe 'asset-list' do
      it 'lists the entities with the correct data' do
        stub_request(:get, "http://example.com/asset")
        .to_return(body: [{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }].to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Asset.list
        expect(out.data).to eq([{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }])
      end
    end

    describe 'geofence-load' do
      it 'loads the entity with the correct data' do
        stub_request(:get, "http://example.com/geofence/t01")
        .to_return(body: { id: 't01', title: 'T01' }.to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Geofence.load(id: 't01')
        expect(out.data).to eq({ id: 't01', title: 'T01' })
      end
    end

    describe 'geofence-list' do
      it 'lists the entities with the correct data' do
        stub_request(:get, "http://example.com/geofence")
        .to_return(body: [{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }].to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Geofence.list
        expect(out.data).to eq([{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }])
      end
    end

    describe 'room-load' do
      it 'loads the entity with the correct data' do
        stub_request(:get, "http://example.com/room/t01")
        .to_return(body: { id: 't01', title: 'T01' }.to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Room.load(id: 't01')
        expect(out.data).to eq({ id: 't01', title: 'T01' })
      end
    end

    describe 'room-list' do
      it 'lists the entities with the correct data' do
        stub_request(:get, "http://example.com/room")
        .to_return(body: [{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }].to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.Room.list
        expect(out.data).to eq([{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }])
      end
    end


end

