#include "dht11.h"

//创建dht11示例
dht11 DHT11;

//定义DHT11接入Arduino的管脚
#define DHT11PIN 2

void setup()
{
  Serial.begin(9600);                     //设置串口波特率为9600
  //以下信息为DHT11库文件版本信息
  Serial.println("DHT11 TEST PROGRAM ");
  Serial.print("LIBRARY VERSION: ");
  Serial.println(DHT11LIB_VERSION);
  Serial.println();
}

void loop()
{
  //记录实验数据组别
  static int count = 1;
  Serial.println(count++);

  //获取DHT11传感器数据
  int chk = DHT11.read(DHT11PIN);

  //DHT11传感器数据校验状态
  Serial.print("Read sensor: ");
  switch (chk)
  {
    case DHTLIB_OK: 
                Serial.println("OK"); 
                break;
    case DHTLIB_ERROR_CHECKSUM: 
                Serial.println("Checksum error"); 
                break;
    case DHTLIB_ERROR_TIMEOUT: 
                Serial.println("Time out error"); 
                break;
    default: 
                Serial.println("Unknown error"); 
                break;
  }

  //打印DHT11获得的湿度数据
  Serial.print("Humidity (%): ");
  Serial.println((float)DHT11.humidity, 2);

  //打印DHT11获得的温度数据
  Serial.print("Temperature (oC): ");
  Serial.println((float)DHT11.temperature, 2);
  
  Serial.println("");

  delay(2000);
}
