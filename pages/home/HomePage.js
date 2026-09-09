class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
       this.networkSVG = `
<svg width="1174" height="528" viewBox="0 0 1174 528" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="450.665" y1="344.371" x2="367.665" y2="269.371" stroke="white" />
<line x1="450.739" y1="343.573" x2="558.739" y2="277.573" stroke="white"/>
<line x1="367.023" y1="268.501" x2="559.023" y2="277.501" stroke="white"/>
<line x1="366.763" y1="268.56" x2="457.763" y2="219.56" stroke="white"/>
<line x1="557.749" y1="278.433" x2="457.749" y2="220.433" stroke="white"/>
<line x1="599.011" y1="217.5" x2="458.011" y2="220.5" stroke="white"/>
<line x1="598.804" y1="217.46" x2="502.804" y2="176.46" stroke="white"/>
<line x1="457.65" y1="219.642" x2="502.65" y2="175.643" stroke="white"/>
<line x1="540.358" y1="138.349" x2="503.358" y2="176.349" stroke="white"/>
<line x1="540.192" y1="137.538" x2="622.192" y2="171.538" stroke="white"/>
<line x1="539.917" y1="137.507" x2="604.917" y2="126.507" stroke="white"/>
<line x1="700.869" y1="153.483" x2="604.869" y2="127.483" stroke="white"/>
<line x1="700.638" y1="153.344" x2="662.638" y2="113.344" stroke="white"/>
<line x1="604.883" y1="126.514" x2="662.883" y2="112.514" stroke="white"/>
<line x1="595.154" y1="90.5243" x2="663.154" y2="112.524" stroke="white"/>
<line x1="594.928" y1="90.5052" x2="642.928" y2="83.5052" stroke="white"/>
<line x1="664.602" y1="113.302" x2="642.602" y2="84.3022" stroke="white"/>
<line x1="727.913" y1="99.4924" x2="642.913" y2="84.4924" stroke="white"/>
<line x1="727.528" y1="99.1636" x2="718.528" y2="73.1636" stroke="white"/>
<line x1="642.928" y1="83.5052" x2="718.928" y2="72.5052" stroke="white"/>
<line x1="706.463" y1="40.8118" x2="719.463" y2="72.8118" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="784.105" y1="59.4888" x2="719.105" y2="73.4888" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="656.137" y1="54.5192" x2="719.137" y2="72.5192" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="664.895" y1="112.511" x2="729.895" y2="98.5112" stroke="white"/>
<line x1="665.126" y1="112.516" x2="757.126" y2="136.516" stroke="white"/>
<line x1="502.983" y1="175.5" x2="621.983" y2="171.5" stroke="white"/>
<line x1="202.802" y1="339.541" x2="367.802" y2="268.541" stroke="white"/>
<line x1="203.008" y1="339.5" x2="451.008" y2="343.533" stroke="white"/>
<line x1="200.371" y1="337.664" x2="286.371" y2="432.664" stroke="white"/>
<line x1="200.269" y1="338.422" x2="120.269" y2="389.422" stroke="white" data-fade="true" />
<line x1="200.046" y1="338.498" x2="69.0456" y2="350.498" stroke="white" data-fade="true"/>
<line x1="199.568" y1="338.251" x2="145.568" y2="245.251" stroke="white"/>
<line x1="39.73" y1="312.579" x2="145.73" y2="244.579" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="8.93131" y1="263.505" x2="145.931" y2="244.505" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="87.3536" y1="185.646" x2="146.354" y2="244.646" stroke="white"/>
<line x1="87.2565" y1="186.429" x2="5.25648" y2="235.429" stroke="white" data-fade="true" />
<line x1="87.0514" y1="186.497" x2="0.051444" y2="195.497" stroke="white" data-fade="true"/>
<line x1="86.6422" y1="186.349" x2="45.6422" y2="144.349" stroke="white"/>
<line x1="13.7549" y1="161.564" x2="45.7549" y2="143.564" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="26.3621" y1="122.655" x2="46.3621" y2="143.655" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="6.93642" y1="148.504" x2="45.9364" y2="143.504" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="128.232" y1="101.443" x2="46.2322" y2="144.443" stroke="white"/>
<line x1="127.78" y1="101.449" x2="80.7802" y2="78.4491" stroke="white" data-fade="true" />
<line x1="128" y1="101.5" x2="84" y2="101.5" stroke="white" data-fade="true"/>
<line x1="127.784" y1="100.549" x2="175.784" y2="77.5491" stroke="white"/>
<line x1="124.179" y1="57.5333" x2="176.179" y2="77.5333" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="234.184" y1="55.4648" x2="176.184" y2="78.4648" stroke="white"/>
<line x1="233.828" y1="55.4693" x2="184.828" y2="37.4693" stroke="white" data-fade="true" />
<line x1="233.73" y1="54.5789" x2="283.73" y2="22.5789" stroke="white"/>
<line x1="200.946" y1="31.5029" x2="283.946" y2="22.5029" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="339.193" y1="0.46129" x2="284.193" y2="23.4613" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="250.19" y1="8.53766" x2="284.19" y2="22.5377" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="358.799" y1="56.4577" x2="283.799" y2="23.4577" stroke="white"/>
<line x1="359.204" y1="56.4566" x2="303.204" y2="81.4566" stroke="white"/>
<line x1="302.525" y1="81.1557" x2="283.525" y2="23.1557" stroke="white"/>
<line x1="302.824" y1="81.4679" x2="233.824" y2="55.4679" stroke="white"/>
<line x1="303.171" y1="81.4697" x2="240.171" y2="104.47" stroke="white"/>
<line x1="317.776" y1="143.447" x2="239.776" y2="104.447" stroke="white"/>
<line x1="176.188" y1="77.5368" x2="240.188" y2="103.537" stroke="white"/>
<line x1="165.818" y1="132.534" x2="239.818" y2="103.534" stroke="white"/>
<line x1="165.678" y1="133.382" x2="127.678" y2="101.382" stroke="white"/>
<line x1="166.279" y1="133.415" x2="87.2786" y2="186.415" stroke="white"/>
<line x1="166.046" y1="133.498" x2="46.0456" y2="144.498" stroke="white"/>
<line x1="166.036" y1="132.501" x2="319.036" y2="143.501" stroke="white"/>
<line x1="434.004" y1="142.5" x2="318.004" y2="143.491" stroke="white"/>
<line x1="293.528" y1="211.836" x2="317.528" y2="142.827" stroke="white"/>
<line x1="293.748" y1="212.432" x2="228.748" y2="174.432" stroke="white"/>
<line x1="318.16" y1="144.474" x2="229.16" y2="174.474" stroke="white"/>
<line x1="166.273" y1="132.581" x2="229.273" y2="173.581" stroke="white"/>
<line x1="86.9509" y1="187.502" x2="228.951" y2="173.502" stroke="white"/>
<line x1="145.675" y1="244.62" x2="228.675" y2="173.62" stroke="white"/>
<line x1="145.891" y1="244.512" x2="293.891" y2="211.512" stroke="white"/>
<line x1="233.628" y1="278.666" x2="293.628" y2="211.666" stroke="white"/>
<line x1="367.695" y1="269.396" x2="293.695" y2="212.396" stroke="white"/>
<line x1="457.976" y1="220.499" x2="293.976" y2="212.499" stroke="white"/>
<line x1="381.187" y1="177.464" x2="294.187" y2="212.464" stroke="white"/>
<line x1="380.763" y1="177.44" x2="317.763" y2="143.44" stroke="white"/>
<line x1="380.724" y1="176.583" x2="433.724" y2="141.583" stroke="white"/>
<line x1="381.244" y1="176.563" x2="458.244" y2="219.563" stroke="white"/>
<line x1="381" y1="176.5" x2="503" y2="176.5" stroke="white"/>
<line x1="434.226" y1="141.554" x2="503.226" y2="176.554" stroke="white"/>
<line x1="233.818" y1="279.466" x2="146.818" y2="245.466" stroke="white"/>
<line x1="234.433" y1="279.25" x2="200.433" y2="338.25" stroke="white"/>
<line x1="233.963" y1="278.501" x2="367.963" y2="268.501" stroke="white"/>
<line x1="433.981" y1="141.5" x2="539.981" y2="137.5" stroke="white"/>
<line x1="433.701" y1="141.599" x2="476.702" y2="109.599" stroke="white"/>
<line x1="433.785" y1="142.452" x2="372.785" y2="113.452" stroke="white"/>
<line x1="317.754" y1="143.564" x2="372.754" y2="112.564" stroke="white"/>
<line x1="303.208" y1="80.5453" x2="373.208" y2="112.545" stroke="white"/>
<line x1="412.317" y1="81.3865" x2="373.317" y2="113.387" stroke="white"/>
<line x1="411.947" y1="80.5028" x2="486.947" y2="72.5028" stroke="white"/>
<line x1="412.204" y1="80.5434" x2="477.204" y2="109.543" stroke="white"/>
<line x1="372.986" y1="112.5" x2="476.986" y2="109.5" stroke="white"/>
<line x1="432.048" y1="49.4977" x2="359.048" y2="56.4977" stroke="white"/>
<line x1="413.793" y1="81.4552" x2="358.793" y2="56.4552" stroke="white"/>
<line x1="487.484" y1="72.1272" x2="477.484" y2="110.127" stroke="white"/>
<line x1="486.807" y1="72.4613" x2="431.807" y2="49.4613" stroke="white"/>
<line x1="370.16" y1="27.5264" x2="432.16" y2="48.5264" stroke="white"/>
<line x1="503.077" y1="38.4941" x2="432.077" y2="49.4941" stroke="white"/>
<line x1="502.842" y1="38.4743" x2="436.842" y2="16.4743" stroke="white" data-fade="true" />
<line x1="502.54" y1="37.8052" x2="513.539" y2="11.8052" stroke="white" data-fade="true"/>
<line x1="502.889" y1="37.5124" x2="590.889" y2="17.5124" stroke="white" data-fade="true"/>
<line x1="503.186" y1="37.5358" x2="558.186" y2="59.5358" stroke="white"/>
<line x1="622.062" y1="52.4961" x2="558.062" y2="60.4961" stroke="white"/>
<line x1="642.864" y1="84.4812" x2="557.864" y2="60.4812" stroke="white"/>
<line x1="594.679" y1="91.3833" x2="557.679" y2="60.3833" stroke="white"/>
<line x1="486.91" y1="72.5082" x2="557.91" y2="59.5082" stroke="white"/>
<line x1="487.211" y1="72.5465" x2="543.211" y2="98.5465" stroke="white"/>
<line x1="476.918" y1="109.507" x2="542.918" y2="98.5068" stroke="white"/>
<line x1="477.203" y1="109.543" x2="540.203" y2="137.543" stroke="white"/>
<line x1="543.206" y1="98.5443" x2="605.206" y2="126.544" stroke="white"/>
<line x1="593.079" y1="91.4937" x2="543.079" y2="99.4937" stroke="white"/>
<line x1="621.592" y1="52.289" x2="604.592" y2="28.289" stroke="white" data-fade="true" />
<line x1="622.418" y1="51.7257" x2="643.418" y2="83.7257" stroke="white"/>
<line x1="369.523" y1="28.1506" x2="363.523" y2="9.15057" stroke="white" data-fade="true" />
<line x1="369.971" y1="28.4992" x2="283.971" y2="23.4992" stroke="white"/>
<line x1="369.884" y1="27.5136" x2="411.884" y2="17.5136" stroke="white" data-fade="true" />
<line x1="451.229" y1="344.445" x2="284.229" y2="430.445" stroke="white"/>
<line x1="451.35" y1="343.643" x2="565.35" y2="455.643" stroke="white"/>
<line x1="713.249" y1="370.434" x2="565.249" y2="455.434" stroke="white"/>
<line x1="712.951" y1="370.498" x2="450.951" y2="344.498" stroke="white"/>
<line x1="713.356" y1="369.649" x2="835.356" y2="493.649" stroke="white"/>
<line x1="957.289" y1="403.408" x2="833.289" y2="491.408" stroke="white"/>
<line x1="956.933" y1="403.495" x2="712.933" y2="370.495" stroke="white"/>
<line x1="956.514" y1="402.882" x2="980.514" y2="303.882" stroke="white"/>
<line x1="956.888" y1="402.513" x2="1113.89" y2="366.513" stroke="white"/>
<line x1="1153.57" y1="432.262" x2="1113.57" y2="367.262" stroke="white" data-fade="true" />
<line x1="1173.79" y1="395.453" x2="1113.79" y2="367.453" stroke="white" data-fade="true" />
<line x1="1163.34" y1="321.365" x2="1114.34" y2="367.365" stroke="white"/>
<line x1="1162.95" y1="321.498" x2="980.953" y2="304.498" stroke="white"/>
<line x1="1162.79" y1="321.454" x2="1051.79" y2="270.454" stroke="white"/>
<line x1="980.784" y1="303.549" x2="1051.78" y2="269.549" stroke="white"/>
<line x1="1121.11" y1="254.487" x2="1052.11" y2="270.487" stroke="white"/>
<line x1="1120.85" y1="254.477" x2="980.85" y2="210.477" stroke="white"/>
<line x1="1051.68" y1="270.382" x2="980.677" y2="210.382" stroke="white"/>
<line x1="1051.85" y1="270.477" x2="906.849" y2="224.477" stroke="white"/>
<line x1="980.633" y1="304.34" x2="906.633" y2="224.34" stroke="white"/>
<line x1="980.82" y1="304.467" x2="832.82" y2="247.467" stroke="white"/>
<line x1="907.148" y1="224.477" x2="833.148" y2="247.477" stroke="white"/>
<line x1="957.148" y1="402.523" x2="1134.15" y2="457.523" stroke="white" data-fade="true" />
<line x1="957.337" y1="402.63" x2="1057.34" y2="493.63" stroke="white" data-fade="true" />
<line x1="981.214" y1="303.548" x2="1114.21" y2="366.548" stroke="white"/>
<line x1="981.037" y1="304.499" x2="833.037" y2="315.499" stroke="white"/>
<line x1="956.707" y1="403.406" x2="834.708" y2="315.406" stroke="white"/>
<line x1="712.788" y1="371.547" x2="834.788" y2="314.547" stroke="white"/>
<line x1="714.5" y1="372.009" x2="712.5" y2="263.009" stroke="white"/>
<line x1="834.804" y1="315.46" x2="712.804" y2="263.46" stroke="white"/>
<line x1="835.065" y1="247.496" x2="713.065" y2="263.496" stroke="white"/>
<line x1="728.487" y1="198.112" x2="713.487" y2="263.112" stroke="white"/>
<line x1="728.211" y1="197.547" x2="833.211" y2="246.547" stroke="white"/>
<line x1="727.575" y1="198.264" x2="699.576" y2="153.264" stroke="white"/>
<line x1="622.88" y1="171.515" x2="699.88" y2="152.515" stroke="white"/>
<line x1="799.848" y1="185.476" x2="699.848" y2="153.476" stroke="white"/>
<line x1="800.089" y1="185.492" x2="728.089" y2="198.492" stroke="white"/>
<line x1="800.171" y1="184.53" x2="907.171" y2="223.53" stroke="white"/>
<line x1="859.367" y1="171.661" x2="907.367" y2="223.661" stroke="white"/>
<line x1="859.115" y1="172.487" x2="804.115" y2="185.487" stroke="white"/>
<line x1="859.149" y1="171.523" x2="981.149" y2="209.523" stroke="white"/>
<line x1="906.907" y1="223.509" x2="980.907" y2="209.509" stroke="white"/>
<line x1="1052.13" y1="191.483" x2="981.129" y2="210.483" stroke="white"/>
<line x1="1051.87" y1="191.482" x2="927.868" y2="157.482" stroke="white"/>
<line x1="980.646" y1="210.354" x2="927.646" y2="157.354" stroke="white"/>
<line x1="858.894" y1="171.511" x2="927.894" y2="156.511" stroke="white"/>
<line x1="811.143" y1="121.521" x2="928.143" y2="156.521" stroke="white"/>
<line x1="996.166" y1="133.471" x2="928.166" y2="157.471" stroke="white" data-fade="true" />
<line x1="888.12" y1="103.485" x2="811.12" y2="122.485" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="728.134" y1="98.5182" x2="811.134" y2="121.518" stroke="white"/>
<line x1="727.95" y1="98.5025" x2="806.95" y2="90.5025" stroke="white" data-fade="true" />
<line x1="728.397" y1="98.6967" x2="757.397" y2="136.697" stroke="white"/>
<line x1="812.132" y1="122.482" x2="757.132" y2="137.482" stroke="white"/>
<line x1="698.867" y1="152.518" x2="756.867" y2="136.518" stroke="white"/>
<line x1="800.631" y1="185.338" x2="756.631" y2="137.338" stroke="white"/>
<line x1="858.838" y1="172.473" x2="756.838" y2="137.473" stroke="white"/>
<line x1="858.632" y1="172.339" x2="812.632" y2="122.339" stroke="white"/>
<line x1="727.88" y1="198.485" x2="622.88" y2="172.485" stroke="white"/>
<line x1="598.559" y1="216.765" x2="622.559" y2="171.765" stroke="white"/>
<line x1="599.416" y1="217.277" x2="557.416" y2="280.277" stroke="white"/>
<line x1="599.184" y1="216.535" x2="715.184" y2="262.535" stroke="white"/>
<line x1="598.927" y1="216.505" x2="727.927" y2="197.505" stroke="white"/>
<line x1="714.744" y1="372.43" x2="556.744" y2="278.43" stroke="white"/>
<line x1="713.051" y1="262.497" x2="557.051" y2="278.497" stroke="white"/>
<line x1="565.07" y1="455.505" x2="835.07" y2="493.505" stroke="white"/>
<line x1="565.382" y1="455.678" x2="619.382" y2="519.678" stroke="white" data-fade="true"/>
<line x1="563.257" y1="455.429" x2="508.257" y2="488.429" stroke="white" data-fade="true"/>
<line x1="833.439" y1="494.239" x2="815.439" y2="527.239" stroke="white" data-fade="true"/>
<line x1="833.116" y1="493.514" x2="950.116" y2="521.514" stroke="white" data-fade="true"/>
<line x1="237.643" y1="478.65" x2="284.643" y2="430.65" stroke="white" data-fade="true" data-reverse="true"/>
<line x1="564.957" y1="455.498" x2="284.957" y2="431.498" stroke="white"/>
<circle cx="45.5" cy="144.5" r="3.5" fill="#D9D9D9"/>
<circle cx="85.5" cy="186.5" r="4.5" fill="#D9D9D9"/>
<circle cx="166.5" cy="132.5" r="4.5" fill="#D9D9D9"/>
<circle cx="144.5" cy="243.5" r="5.5" fill="#D9D9D9"/>
<circle cx="232.5" cy="279.5" r="4.5" fill="#D9D9D9"/>
<circle cx="292.5" cy="211.5" r="4.5" fill="#D9D9D9"/>
<circle cx="380" cy="177" r="4" fill="#D9D9D9"/>
<circle cx="227.5" cy="173.5" r="4.5" fill="#D9D9D9"/>
<circle cx="318" cy="144" r="6" fill="#D9D9D9"/>
<circle cx="372.5" cy="113.5" r="4.5" fill="#D9D9D9"/>
<circle cx="411" cy="82" r="4" fill="#D9D9D9"/>
<circle cx="303" cy="81" r="4" fill="#D9D9D9"/>
<circle cx="358.5" cy="56.5" r="3.5" fill="#D9D9D9"/>
<circle cx="370" cy="28" r="3" fill="#D9D9D9"/>
<circle cx="432" cy="49" r="3" fill="#D9D9D9"/>
<circle cx="503" cy="38" r="3" fill="#D9D9D9"/>
<circle cx="487" cy="73" r="3" fill="#D9D9D9"/>
<circle cx="557" cy="60" r="3" fill="#D9D9D9"/>
<circle cx="594" cy="91" r="3" fill="#D9D9D9"/>
<circle cx="641" cy="84" r="3" fill="#D9D9D9"/>
<circle cx="621.5" cy="52.5" r="2.5" fill="#D9D9D9"/>
<circle cx="718.5" cy="72.5" r="2.5" fill="#D9D9D9"/>
<circle cx="727" cy="99" r="3" fill="#D9D9D9"/>
<circle cx="663" cy="113" r="3" fill="#D9D9D9"/>
<circle cx="756" cy="137" r="3" fill="#D9D9D9"/>
<circle cx="698.5" cy="152.5" r="3.5" fill="#D9D9D9"/>
<circle cx="813" cy="122" r="3" fill="#D9D9D9"/>
<circle cx="477" cy="110" r="3" fill="#D9D9D9"/>
<circle cx="543.5" cy="99.5" r="2.5" fill="#D9D9D9"/>
<circle cx="433.5" cy="141.5" r="3.5" fill="#D9D9D9"/>
<circle cx="284" cy="23" r="5" fill="#D9D9D9"/>
<circle cx="233" cy="55" r="4" fill="#D9D9D9"/>
<circle cx="175.5" cy="77.5" r="3.5" fill="#D9D9D9"/>
<circle cx="238.5" cy="104.5" r="4.5" fill="#D9D9D9"/>
<circle cx="126" cy="101" r="4" fill="#D9D9D9"/>
<circle cx="365" cy="269" r="5" fill="#D9D9D9"/>
<circle cx="283" cy="431" r="5" fill="#D9D9D9"/>
<circle cx="451" cy="344" r="5" fill="#D9D9D9"/>
<circle cx="563.5" cy="454.5" r="5.5" fill="#D9D9D9"/>
<circle cx="713" cy="372" r="6" fill="#D9D9D9"/>
<circle cx="833" cy="491" r="6" fill="#D9D9D9"/>
<circle cx="955.5" cy="402.5" r="5.5" fill="#D9D9D9"/>
<circle cx="1112.5" cy="366.5" r="5.5" fill="#D9D9D9"/>
<circle cx="1163" cy="321" r="4" fill="#D9D9D9"/>
<circle cx="1050" cy="191" r="3" fill="#D9D9D9"/>
<circle cx="980" cy="304" r="6" fill="#D9D9D9"/>
<circle cx="1049.5" cy="269.5" r="4.5" fill="#D9D9D9"/>
<circle cx="1117.5" cy="253.5" r="3.5" fill="#D9D9D9"/>
<circle cx="980.5" cy="209.5" r="3.5" fill="#D9D9D9"/>
<circle cx="907.5" cy="223.5" r="3.5" fill="#D9D9D9"/>
<circle cx="832.5" cy="246.5" r="3.5" fill="#D9D9D9"/>
<circle cx="801" cy="185" r="4" fill="#D9D9D9"/>
<circle cx="859" cy="172" r="4" fill="#D9D9D9"/>
<circle cx="928" cy="157" r="5" fill="#D9D9D9"/>
<circle cx="728" cy="198" r="4" fill="#D9D9D9"/>
<circle cx="712.5" cy="262.5" r="5.5" fill="#D9D9D9"/>
<circle cx="834.5" cy="315.5" r="5.5" fill="#D9D9D9"/>
<circle cx="557" cy="279" r="5" fill="#D9D9D9"/>
<circle cx="599.5" cy="217.5" r="4.5" fill="#D9D9D9"/>
<circle cx="620" cy="172" r="4" fill="#D9D9D9"/>
<circle cx="539" cy="138" r="4" fill="#D9D9D9"/>
<circle cx="502.5" cy="176.5" r="3.5" fill="#D9D9D9"/>
<circle cx="456" cy="220" r="5" fill="#D9D9D9"/>
<circle cx="199.5" cy="339.5" r="7.5" fill="#D9D9D9"/>
</svg>


        `;
        
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        this.nodes = [];
        this.edges = [];
        this.circles = [];
        this.nodeDegree = new Map();
        
        this.svgWidth = 1174;
        this.svgHeight = 528;
        
        // Переменные для анимации
        this.time = 0;
        this.lastFrameTime = 0;
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/HomePage.css">
            <div class="home-page">
                <div class="bg-looper-wrapper">
                    <canvas id="network-canvas"></canvas>
                </div>
                <section class="hero-section">
                    <div class="hero-content"><hero-block></hero-block></div>
                    <div class="phone-showcase"><phone-showcase></phone-showcase></div>
                    <div class="features-list"><features-list></features-list></div>
                </section>
                <section class="trusted-section"><trusted-by></trusted-by></section>
                <section class="stats-section"><stats-grid></stats-grid></section>
                <section class="slider-section"><top-playables-slider></top-playables-slider></section>
            </div>
        `;

        await this.initNetworkCanvas();
    }

    async initNetworkCanvas() {
        this.canvas = this.shadowRoot.getElementById('network-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.parseSVGFromString();
        this.setNaturalSize();
        
        // Запускаем цикл анимации
        this.lastFrameTime = performance.now();
        this.animate();
    }

    parseSVGFromString() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.networkSVG, "image/svg+xml");
        
        const nodeSet = new Set();
        this.edges = [];
        this.circles = [];
        this.nodeDegree = new Map();

        // 1. Парсим линии
        doc.querySelectorAll('line').forEach(line => {
            const x1 = parseFloat(line.getAttribute('x1'));
            const y1 = parseFloat(line.getAttribute('y1'));
            const x2 = parseFloat(line.getAttribute('x2'));
            const y2 = parseFloat(line.getAttribute('y2'));
            
            if (!isNaN(x1)) {
                this.edges.push({ 
                    x1, y1, x2, y2,
                    isFade: line.hasAttribute('data-fade'),
                    isReverse: line.hasAttribute('data-reverse')
                });
                nodeSet.add(`${x1},${y1}`);
                nodeSet.add(`${x2},${y2}`);
            }
        });

        // 2. Парсим пути (если есть)
        doc.querySelectorAll('path').forEach(path => {
            const d = path.getAttribute('d');
            const matches = [...d.matchAll(/M\s*([\d.-]+)\s+([\d.-]+)\s+L\s*([\d.-]+)\s+([\d.-]+)/g)];
            matches.forEach(m => {
                const x1 = parseFloat(m[1]), y1 = parseFloat(m[2]);
                const x2 = parseFloat(m[3]), y2 = parseFloat(m[4]);
                this.edges.push({ x1, y1, x2, y2, isFade: false, isReverse: false });
                nodeSet.add(`${x1},${y1}`);
                nodeSet.add(`${x2},${y2}`);
            });
        });

        // 3. Парсим круги и добавляем ОДИН общий sizeFactor для синхронизации ядра и свечения
        doc.querySelectorAll('circle').forEach(circle => {
            const cx = parseFloat(circle.getAttribute('cx'));
            const cy = parseFloat(circle.getAttribute('cy'));
            const r = parseFloat(circle.getAttribute('r'));
            const fill = circle.getAttribute('fill') || '#D9D9D9';
            
            if (!isNaN(cx)) {
                this.circles.push({ 
                    cx, 
                    cy, 
                    r, 
                    fill,
                    sizeFactor: 0.5 + Math.random(), // От 0.5 до 1.5 (большие и маленькие звезды)
                    phase: Math.random() * Math.PI * 2, // Уникальная фаза для асинхронной пульсации
                    speed: 0.5 + Math.random() * 1.5    // Уникальная скорость пульсации
                });
            }
        });

        // 4. Считаем degree
        this.edges.forEach(edge => {
            const key1 = `${edge.x1},${edge.y1}`;
            const key2 = `${edge.x2},${edge.y2}`;
            this.nodeDegree.set(key1, (this.nodeDegree.get(key1) || 0) + 1);
            this.nodeDegree.set(key2, (this.nodeDegree.get(key2) || 0) + 1);
        });

        this.nodes = Array.from(nodeSet).map(str => {
            const [x, y] = str.split(',').map(Number);
            return { x, y, degree: this.nodeDegree.get(str) || 0 };
        });
    }

    setNaturalSize() {
        this.canvas.width = this.svgWidth;
        this.canvas.height = this.svgHeight;
    }

    animate(timestamp = 0) {
        if (!this.ctx) return;
        
        
        const rawDelta = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        const normalizedDelta = rawDelta / (1 / 60);
        this.time += normalizedDelta * 0.016;
        
        const { ctx } = this;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.clearRect(0, 0, width, height);

        // === 1. ЛИНИИ  ===
        this.edges.forEach(edge => {
            const gradient = ctx.createLinearGradient(edge.x1, edge.y1, edge.x2, edge.y2);
            
            if (edge.isFade) {
                if (edge.isReverse) {
                    gradient.addColorStop(0, 'rgba(13, 13, 15, 0)');
                    gradient.addColorStop(1, 'rgba(255, 26, 0, 0.8)');
                } else {
                    gradient.addColorStop(0, 'rgba(255, 26, 0, 0.8)');
                    gradient.addColorStop(1, 'rgba(13, 13, 15, 0)');
                }
            } else {
                gradient.addColorStop(0, 'rgba(255, 26, 0, 0.8)'); 
                gradient.addColorStop(0.5, 'rgba(119, 0, 2, 0.6)'); 
                gradient.addColorStop(1, 'rgba(255, 26, 0, 0.8)');
            }
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            
          
            ctx.setLineDash([100, 5]); 
           
            ctx.lineDashOffset = -this.time * 15; 

            ctx.beginPath();
            ctx.moveTo(edge.x1, edge.y1);
            ctx.lineTo(edge.x2, edge.y2);
            ctx.stroke();

            
            ctx.setLineDash([]);
        });

        // === 2.ТОЧКИ  ===
        this.circles.forEach(circle => {
            const px = circle.cx;
            const py = circle.cy;
            const r = circle.r;
            const sizeFactor = circle.sizeFactor || 1;
            
            // Пульсация от 0.4 до 1.0 (только для красного свечения!)
            const pulse = 0.8 + 1 * Math.sin(this.time * circle.speed + circle.phase);
            
            
            const glowRadius = r * 5 * sizeFactor;
            const coreRadius = r * 0.6 * sizeFactor;

            
            const outerGlow = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
            outerGlow.addColorStop(0, `rgba(255, 26, 0, ${0.6 * pulse})`);
            outerGlow.addColorStop(0.1, `rgba(255, 26, 0, ${0.3 * pulse})`);
            outerGlow.addColorStop(1, 'rgba(255, 0, 52, 0)');
            
            ctx.fillStyle = outerGlow;
            ctx.beginPath();
            ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
            ctx.fill();

           
            const coreGlow = ctx.createRadialGradient(px, py, 0, px, py, coreRadius);
            coreGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');       // Всегда 100% непрозрачный белый
            coreGlow.addColorStop(0.5, 'rgba(255, 220, 230, 0.9)');   // Почти непрозрачный
            coreGlow.addColorStop(1, 'rgba(255, 200, 210, 0)');       // Мягкий край для слияния
            
            ctx.fillStyle = coreGlow;
            ctx.beginPath();
            ctx.arc(px, py, coreRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Запрашиваем следующий кадр
        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    disconnectedCallback() {
        // Обязательно очищаем анимацию при удалении компонента со страницы
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

customElements.define('page-home', HomePage);