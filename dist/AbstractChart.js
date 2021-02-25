var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
export var DEFAULT_X_LABELS_HEIGHT_PERCENTAGE = 0.75;
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [0])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else if (_this.props.fromNumber) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [_this.props.fromNumber])) -
            Math.min.apply(
              Math,
              __spreadArrays(data, [_this.props.fromNumber])
            ) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      var basePosition = height * verticalLabelsHeightPercentage;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height * verticalLabelsHeightPercentage + paddingTop}
          x2={width}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c,
        _d = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _d === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _d;
      var _e = _this.props,
        _f = _e.yAxisLabel,
        yAxisLabel = _f === void 0 ? "" : _f,
        _g = _e.yAxisSuffix,
        yAxisSuffix = _g === void 0 ? "" : _g,
        _h = _e.yLabelsOffset,
        yLabelsOffset = _h === void 0 ? 12 : _h;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height * verticalLabelsHeightPercentage;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : height * verticalLabelsHeightPercentage -
              (basePosition / count) * i +
              paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForHorizontalLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f,
        _g = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g;
      var _h = _this.props,
        _j = _h.xAxisLabel,
        xAxisLabel = _j === void 0 ? "" : _j,
        _k = _h.xLabelsOffset,
        xLabelsOffset = _k === void 0 ? 0 : _k,
        _l = _h.hidePointsAtIndex,
        hidePointsAtIndex = _l === void 0 ? [] : _l;
      var fontSize = 20;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y =
          height * verticalLabelsHeightPercentage +
          paddingTop +
          fontSize * 2 +
          xLabelsOffset;
        return (
          <Text
            origin={x + ", " + y}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForVerticalLabels()}
          >
            {"" + formatXLabel(label) + xAxisLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      var _c = _this.props.yAxisInterval,
        yAxisInterval = _c === void 0 ? 1 : _c;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height * verticalLabelsHeightPercentage + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradient_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset="0"
                    stopColor={
                      dataset.color ? dataset.color(1.0) : fillShadowGradient
                    }
                    stopOpacity={fillShadowGradientOpacity}
                  />
                  <Stop
                    offset="1"
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientOpacity)
                        : fillShadowGradient
                    }
                    stopOpacity="0"
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradient"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={fillShadowGradient}
                stopOpacity={fillShadowGradientOpacity}
              />
              <Stop offset="1" stopColor={fillShadowGradient} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  AbstractChart.prototype.getPropsForVerticalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForVerticalLabels,
      propsForVerticalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForVerticalLabels);
  };
  AbstractChart.prototype.getPropsForHorizontalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForHorizontalLabels,
      propsForHorizontalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForHorizontalLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFDMUUsTUFBTSxDQUFDLElBQU0sa0NBQWtDLEdBQUcsSUFBSSxDQUFDO0FBRXZEO0lBR1UsaUNBQW1FO0lBSDdFO1FBQUEscUVBa2NDO1FBOWJDLGdCQUFVLEdBQUcsVUFBQyxJQUFjO1lBQzFCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxDQUFDLE1BQUksSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsT0FBTyxDQUNMLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLE1BQ3JDLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxpQkFBUSxJQUFJLEdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQ2hELENBQUM7YUFDSDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxFQUFRLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksRUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENB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XCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBEZWZzLCBMaW5lLCBMaW5lYXJHcmFkaWVudCwgU3RvcCwgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgeyBDaGFydENvbmZpZywgRGF0YXNldCwgUGFydGlhbEJ5IH0gZnJvbSBcIi4vSGVscGVyVHlwZXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICBmb250U2l6ZT86IG51bWJlcjtcclxuICBmcm9tWmVybz86IGJvb2xlYW47XHJcbiAgZnJvbU51bWJlcj86IG51bWJlcjtcclxuICBjaGFydENvbmZpZz86IEFic3RyYWN0Q2hhcnRDb25maWc7XHJcbiAgeUF4aXNMYWJlbD86IHN0cmluZztcclxuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcclxuICB5TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xyXG4gIHlBeGlzSW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcclxuICB4TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xyXG4gIGhpZGVQb2ludHNBdEluZGV4PzogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydENvbmZpZyBleHRlbmRzIENoYXJ0Q29uZmlnIHtcclxuICBjb3VudD86IG51bWJlcjtcclxuICBkYXRhPzogRGF0YXNldFtdO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICBwYWRkaW5nVG9wPzogbnVtYmVyO1xyXG4gIHBhZGRpbmdSaWdodD86IG51bWJlcjtcclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBsYWJlbHM/OiBzdHJpbmdbXTtcclxuICBob3Jpem9udGFsT2Zmc2V0PzogbnVtYmVyO1xyXG4gIHN0YWNrZWRCYXI/OiBib29sZWFuO1xyXG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRYTGFiZWw/OiAoeExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEFic3RyYWN0Q2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0UgPSAwLjc1O1xyXG5cclxuY2xhc3MgQWJzdHJhY3RDaGFydDxcclxuICBJUHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMsXHJcbiAgSVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RDaGFydFN0YXRlXHJcbj4gZXh0ZW5kcyBDb21wb25lbnQ8QWJzdHJhY3RDaGFydFByb3BzICYgSVByb3BzLCBBYnN0cmFjdENoYXJ0U3RhdGUgJiBJU3RhdGU+IHtcclxuICBjYWxjU2NhbGVyID0gKGRhdGE6IG51bWJlcltdKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5mcm9tWmVybykge1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSwgMCkgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBNYXRoLm1heCguLi5kYXRhLCB0aGlzLnByb3BzLmZyb21OdW1iZXIpIC1cclxuICAgICAgICAgIE1hdGgubWluKC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgfHwgMVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEpIC0gTWF0aC5taW4oLi4uZGF0YSkgfHwgMTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjQmFzZUhlaWdodCA9IChkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XHJcbiAgICBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcclxuICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPiAwKSB7XHJcbiAgICAgIHJldHVybiAoaGVpZ2h0ICogbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjSGVpZ2h0ID0gKHZhbDogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XHJcblxyXG4gICAgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xyXG4gICAgICByZXR1cm4gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxyXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtaW4pIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcclxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKSB7XHJcbiAgICBjb25zdCB7IHByb3BzRm9yQmFja2dyb3VuZExpbmVzID0ge30gfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdHJva2U6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC4yKSxcclxuICAgICAgc3Ryb2tlRGFzaGFycmF5OiBcIjUsIDEwXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICAuLi5wcm9wc0ZvckJhY2tncm91bmRMaW5lc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yTGFiZWxzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9wc0ZvckxhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxyXG4gICAgICAuLi5wcm9wc0ZvckxhYmVsc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9yVmVydGljYWxMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXHJcbiAgICAgIC4uLnByb3BzRm9yVmVydGljYWxMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9ySG9yaXpvbnRhbExhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySG9yaXpvbnRhbExpbmVzID0gY29uZmlnID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY291bnQsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShjb3VudCArIDEpXS5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgY29uc3QgeSA9IChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICsgcGFkZGluZ1RvcDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8TGluZVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeDE9e3BhZGRpbmdSaWdodH1cclxuICAgICAgICAgIHkxPXt5fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGluZSA9IGNvbmZpZyA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMaW5lXHJcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XHJcbiAgICAgICAgeTE9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXHJcbiAgICBjb25maWc6IE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+ICYgeyBkYXRhOiBudW1iZXJbXSB9XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvdW50LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBkZWNpbWFsUGxhY2VzID0gMixcclxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB5TGFiZWwsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB5QXhpc0xhYmVsID0gXCJcIixcclxuICAgICAgeUF4aXNTdWZmaXggPSBcIlwiLFxyXG4gICAgICB5TGFiZWxzT2Zmc2V0ID0gMTJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheShjb3VudCA9PT0gMSA/IDEgOiBjb3VudCArIDEpLmZpbGwoMSkubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgIGxldCB5TGFiZWwgPSBTdHJpbmcoaSAqIGNvdW50KTtcclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBkYXRhWzBdLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcclxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhLCAwKVxyXG4gICAgICAgICAgOiAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBsYWJlbC50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXHJcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuICAgICAgY29uc3QgeCA9IHBhZGRpbmdSaWdodCAtIHlMYWJlbHNPZmZzZXQ7XHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGNvdW50ID09PSAxICYmIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gcGFkZGluZ1RvcCArIDRcclxuICAgICAgICAgIDogaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlIC1cclxuICAgICAgICAgICAgKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgK1xyXG4gICAgICAgICAgICBwYWRkaW5nVG9wO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICByb3RhdGlvbj17aG9yaXpvbnRhbExhYmVsUm90YXRpb259XHJcbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3h9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcclxuICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzKCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3lMYWJlbH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExhYmVscyA9ICh7XHJcbiAgICBsYWJlbHMgPSBbXSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGhvcml6b250YWxPZmZzZXQgPSAwLFxyXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxyXG4gICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWwsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICB8IFwibGFiZWxzXCJcclxuICAgIHwgXCJ3aWR0aFwiXHJcbiAgICB8IFwiaGVpZ2h0XCJcclxuICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdUb3BcIlxyXG4gICAgfCBcImhvcml6b250YWxPZmZzZXRcIlxyXG4gICAgfCBcInN0YWNrZWRCYXJcIlxyXG4gICAgfCBcInZlcnRpY2FsTGFiZWxSb3RhdGlvblwiXHJcbiAgICB8IFwiZm9ybWF0WExhYmVsXCJcclxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gID4pID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgeEF4aXNMYWJlbCA9IFwiXCIsXHJcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxyXG4gICAgICBoaWRlUG9pbnRzQXRJbmRleCA9IFtdXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBmb250U2l6ZSA9IDIwO1xyXG5cclxuICAgIGxldCBmYWMgPSAxO1xyXG4gICAgaWYgKHN0YWNrZWRCYXIpIHtcclxuICAgICAgZmFjID0gMC43MTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWxzLm1hcCgobGFiZWwsIGkpID0+IHtcclxuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHggPVxyXG4gICAgICAgICgoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGxhYmVscy5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldCkgKlxyXG4gICAgICAgIGZhYztcclxuXHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArXHJcbiAgICAgICAgcGFkZGluZ1RvcCArXHJcbiAgICAgICAgZm9udFNpemUgKiAyICtcclxuICAgICAgICB4TGFiZWxzT2Zmc2V0O1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgb3JpZ2luPXtgJHt4fSwgJHt5fWB9XHJcbiAgICAgICAgICByb3RhdGlvbj17dmVydGljYWxMYWJlbFJvdGF0aW9ufVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17eH1cclxuICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPXt2ZXJ0aWNhbExhYmVsUm90YXRpb24gPT09IDAgPyBcIm1pZGRsZVwiIDogXCJzdGFydFwifVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7YCR7Zm9ybWF0WExhYmVsKGxhYmVsKX0ke3hBeGlzTGFiZWx9YH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExpbmVzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogT21pdDxcclxuICAgIFBpY2s8XHJcbiAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgIHwgXCJkYXRhXCJcclxuICAgICAgfCBcIndpZHRoXCJcclxuICAgICAgfCBcImhlaWdodFwiXHJcbiAgICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gICAgPixcclxuICAgIFwiZGF0YVwiXHJcbiAgPiAmIHsgZGF0YTogbnVtYmVyW10gfSkgPT4ge1xyXG4gICAgY29uc3QgeyB5QXhpc0ludGVydmFsID0gMSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSldLm1hcChcclxuICAgICAgKF8sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPExpbmVcclxuICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICB4MT17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICB4Mj17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGluZSA9ICh7XHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICA+KSA9PiAoXHJcbiAgICA8TGluZVxyXG4gICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XHJcbiAgICAgIHkxPXswfVxyXG4gICAgICB4Mj17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxyXG4gICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyRGVmcyA9IChcclxuICAgIGNvbmZpZzogUGljazxcclxuICAgICAgUGFydGlhbEJ5PFxyXG4gICAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXHJcbiAgICAgID4sXHJcbiAgICAgIHwgXCJ3aWR0aFwiXHJcbiAgICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbVwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb1wiXHJcbiAgICAgIHwgXCJ1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XCJcclxuICAgICAgfCBcImRhdGFcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgID5cclxuICApID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50VG8sXHJcbiAgICAgIHVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IDEuMDtcclxuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiZmlsbFNoYWRvd0dyYWRpZW50XCIpXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFxyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEZWZzPlxyXG4gICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgaWQ9XCJiYWNrZ3JvdW5kR3JhZGllbnRcIlxyXG4gICAgICAgICAgeDE9ezB9XHJcbiAgICAgICAgICB5MT17aGVpZ2h0fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9ezB9XHJcbiAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgIG9mZnNldD1cIjBcIlxyXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmcm9tT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICBvZmZzZXQ9XCIxXCJcclxuICAgICAgICAgICAgc3RvcENvbG9yPXtiYWNrZ3JvdW5kR3JhZGllbnRUb31cclxuICAgICAgICAgICAgc3RvcE9wYWNpdHk9e3RvT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICB7dXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCA/IChcclxuICAgICAgICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgICBpZD17YGZpbGxTaGFkb3dHcmFkaWVudF8ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICAgIHkyPXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9XCIwXCJcclxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XHJcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY29sb3IgPyBkYXRhc2V0LmNvbG9yKDEuMCkgOiBmaWxsU2hhZG93R3JhZGllbnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjFcIlxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5KVxyXG4gICAgICAgICAgICAgICAgICAgIDogZmlsbFNoYWRvd0dyYWRpZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT1cIjBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgICApKVxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgaWQ9XCJmaWxsU2hhZG93R3JhZGllbnRcIlxyXG4gICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgeTE9ezB9XHJcbiAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgIG9mZnNldD1cIjBcIlxyXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50fVxyXG4gICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtmaWxsU2hhZG93R3JhZGllbnR9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XHJcbiAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvRGVmcz5cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RDaGFydDtcclxuIl19
