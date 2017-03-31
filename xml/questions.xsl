<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<div id="xsl_body">
		<table id="xsl_transform">
			<thead>
				<tr>
					<th>Title</th>
					<th>Option</th>
					<th>Answer</th>
				</tr>
			</thead>
			<tbody>
				<!-- Selecciona los nodos question -->
				<xsl:for-each select="questions/question">      
					<tr class="quest_row">
						<!-- Campo Title -->
						<td class="titulo">
							<xsl:value-of select="title"/>
						</td>
						<!-- Campo Option -->
						<td class="option">
						<!-- Opciones Tipo texto -->
							<xsl:for-each select="answer">
								<xsl:choose>
									<xsl:when test="../type = 'text'">
										<span>
											<xsl:value-of select="text()"/>
										</span>
									</xsl:when>
								</xsl:choose>         
							</xsl:for-each>
							<!-- Opciones diferentes a tipo texto -->
							<!-- Selecciona los nodos option -->
							<xsl:for-each select="option">
								<tr class="options_rows">
									<xsl:variable name="optposition" select="position()-1"/>
									<xsl:variable name="opttext" select="text()"/>
									<td class="opciones_text">
										O<xsl:value-of select="$optposition+1"/>: 
										<xsl:value-of select="$opttext"/>
									</td>
									<!-- Selecciona los nodos answer -->
									<xsl:for-each select="../answer">
										<xsl:variable name="correctanswer" select="text()-1"/>
										<xsl:if test="$optposition=$correctanswer">
											<td class = "correcta">
												<span>&#x2713;</span>
											</td>
										</xsl:if>
									</xsl:for-each>
								</tr>
							</xsl:for-each>
						</td>
						<!-- Campo Answer -->
						<td class="answer">
							<xsl:for-each select="useranswer">
								<tr class="answer_row">
									<xsl:variable name="useranswer" select="text()"/>
									<td class="respuesta">
										<xsl:value-of select="text()"/>
									</td>
									<xsl:for-each select="./correcto">
										<xsl:variable name="valido" select="text()"/>
										<xsl:choose>										
											<xsl:when test="$valido = '1'">
												<td class = "correcta">
													<span>&#x2713;</span>
												</td>
											</xsl:when>
											<xsl:otherwise>
												<td class = "incorrecta">
													<span>X</span>
												</td>
											</xsl:otherwise>
										</xsl:choose>
									</xsl:for-each>
								</tr>
							</xsl:for-each>       
						</td>
					</tr>
				</xsl:for-each>
			</tbody>
		</table>
	</div>
</xsl:template>
</xsl:stylesheet>