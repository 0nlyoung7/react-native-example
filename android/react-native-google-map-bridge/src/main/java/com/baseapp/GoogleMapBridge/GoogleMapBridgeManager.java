package com.baseapp.GoogleMapBridge;

import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapsInitializer;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;

import java.util.Map;

import javax.annotation.Nullable;

public class GoogleMapBridgeManager extends ViewGroupManager<GooleMapBridgeView> {

    public static final String REACT_CLASS = "AIRMap";

    public static final int ANIMATE_TO_REGION = 1;
    public static final int ANIMATE_TO_COORDINATE = 2;
    public static final int FIT_TO_ELEMENTS = 3;

    private Map<String, Integer> MAP_TYPES = MapBuilder.of(
            "standard", GoogleMap.MAP_TYPE_NORMAL,
            "satellite", GoogleMap.MAP_TYPE_SATELLITE,
            "hybrid", GoogleMap.MAP_TYPE_HYBRID
    );

    private ReactContext reactContext;

    public GoogleMapBridgeManager() {
        super();
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected GooleMapBridgeView createViewInstance(ThemedReactContext context) {
        reactContext = context;
        GooleMapBridgeView view = new GooleMapBridgeView(context, this);

        try {
            MapsInitializer.initialize(context.getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
            emitMapError("Map initialize error", "map_init_error");
        }

        return view;
    }

    private void emitMapError (String message, String type) {
        WritableMap error = Arguments.createMap();
        error.putString("message", message);
        error.putString("type", type);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onError", error);
    }

    @ReactProp(name="region")
    public void setRegion(GooleMapBridgeView view, ReadableMap region) {
        view.setRegion(region);
    }

    @ReactProp(name="mapType")
    public void setMapType(GooleMapBridgeView view, @Nullable String mapType) {
        int typeId = MAP_TYPES.get(mapType);
        view.map.setMapType(typeId);
    }

    @ReactProp(name="showsUserLocation", defaultBoolean = false)
    public void setShowsUserLocation(GooleMapBridgeView view, boolean showUserLocation) {
        view.setShowsUserLocation(showUserLocation);
    }

    @ReactProp(name="showsTraffic", defaultBoolean = false)
    public void setShowTraffic(GooleMapBridgeView view, boolean showTraffic) {
        view.map.setTrafficEnabled(showTraffic);
    }

    @ReactProp(name="showsBuildings", defaultBoolean = false)
    public void setShowBuildings(GooleMapBridgeView view, boolean showBuildings) {
        view.map.setBuildingsEnabled(showBuildings);
    }

    @ReactProp(name="showsIndoors", defaultBoolean = false)
    public void setShowIndoors(GooleMapBridgeView view, boolean showIndoors) {
        view.map.setIndoorEnabled(showIndoors);
    }

    @ReactProp(name="showsCompass", defaultBoolean = false)
    public void setShowsCompass(GooleMapBridgeView view, boolean showsCompass) {
        view.map.getUiSettings().setCompassEnabled(showsCompass);
    }

    @ReactProp(name="scrollEnabled", defaultBoolean = false)
    public void setScrollEnabled(GooleMapBridgeView view, boolean scrollEnabled) {
        view.map.getUiSettings().setScrollGesturesEnabled(scrollEnabled);
    }

    @ReactProp(name="zoomEnabled", defaultBoolean = false)
    public void setZoomEnabled(GooleMapBridgeView view, boolean zoomEnabled) {
        view.map.getUiSettings().setZoomGesturesEnabled(zoomEnabled);
    }

    @ReactProp(name="rotateEnabled", defaultBoolean = false)
    public void setRotateEnabled(GooleMapBridgeView view, boolean rotateEnabled) {
        view.map.getUiSettings().setRotateGesturesEnabled(rotateEnabled);
    }

    @Override
    public void receiveCommand(GooleMapBridgeView view, int commandId, @Nullable ReadableArray args) {
        Integer duration;
        Double lat;
        Double lng;
        Double lngDelta;
        Double latDelta;
        ReadableMap region;

        switch (commandId) {
            case ANIMATE_TO_REGION:
                region = args.getMap(0);
                duration = args.getInt(1);
                lng = region.getDouble("longitude");
                lat = region.getDouble("latitude");
                lngDelta = region.getDouble("longitudeDelta");
                latDelta = region.getDouble("latitudeDelta");
                LatLngBounds bounds = new LatLngBounds(
                        new LatLng(lat - latDelta / 2, lng - lngDelta / 2), // southwest
                        new LatLng(lat + latDelta / 2, lng + lngDelta / 2)  // northeast
                );
                view.animateToRegion(bounds, duration);
                break;

            case ANIMATE_TO_COORDINATE:
                region = args.getMap(0);
                duration = args.getInt(1);
                lng = region.getDouble("longitude");
                lat = region.getDouble("latitude");
                view.animateToCoordinate(new LatLng(lat, lng), duration);
                break;
        }
    }

    @Override
    public @Nullable Map getExportedCustomDirectEventTypeConstants() {
        Map map = MapBuilder.of(
                "onMapReady", MapBuilder.of("registrationName", "onMapReady"),
                "onPress", MapBuilder.of("registrationName", "onPress"),
                "onLongPress", MapBuilder.of("registrationName", "onLongPress"),
                "onMarkerPress", MapBuilder.of("registrationName", "onMarkerPress"),
                "onMarkerSelect", MapBuilder.of("registrationName", "onMarkerSelect"),
                "onMarkerDeselect", MapBuilder.of("registrationName", "onMarkerDeselect"),
                "onCalloutPress", MapBuilder.of("registrationName", "onCalloutPress")
        );

        map.putAll(MapBuilder.of(
                "onMarkerDragStart", MapBuilder.of("registrationName", "onMarkerDragStart"),
                "onMarkerDrag", MapBuilder.of("registrationName", "onMarkerDrag"),
                "onMarkerDragEnd", MapBuilder.of("registrationName", "onMarkerDragEnd")
        ));

        return map;
    }

    @Override
    public @Nullable Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "animateToRegion", ANIMATE_TO_REGION,
                "animateToCoordinate", ANIMATE_TO_COORDINATE,
                "fitToElements", FIT_TO_ELEMENTS
        );
    }

    @Override
    public void updateExtraData(GooleMapBridgeView view, Object extraData) {
        view.updateExtraData(extraData);
    }

    public void pushEvent(View view, String name, WritableMap data) {
        ReactContext reactContext = (ReactContext) view.getContext();
        reactContext.getJSModule(RCTEventEmitter.class)
                .receiveEvent(view.getId(), name, data);
    }

}
